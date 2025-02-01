import type { Ref } from 'vue';
import api from '~/lib/api';

export interface ApiOptions {
  minDelayRequest?: number;
}

export const useApi = <T, U>(data: Ref<T>, options?: ApiOptions) => {
  const optionsDefault: ApiOptions = {
    minDelayRequest: 250,
  };
  const globalOptions = { ...optionsDefault, ...options };

  const isLoading = ref<boolean>(true);
  const isFetching = ref<boolean>(true);
  const isError = ref<boolean>(false);
  const error = ref<string>('');

  const get = (url: string) => {
    const send = async (params?: U) => {
      isLoading.value = true;
      isFetching.value = true;
      isError.value = false;

      const minDelay = globalOptions.minDelayRequest ?? 250;
      const startTime = Date.now();
      const result = await api.get(url, params ?? null, {});
      const endTime = Date.now();

      // permet de faire un délai minimum sur les requête pour éviter des flash à l'écran
      await new Promise((resolve) => {
        setTimeout(() => resolve(true), minDelay - (endTime - startTime));
      });

      if (result.error()) {
        // console.log(result.errorMsg());
        isError.value = true;
        error.value = result.errorMsg();
      } else {
        data.value = result.data<T>();
      }

      isFetching.value = false;
      isLoading.value = false;

      return toValue(data);
    };

    return {
      send,
    };
  };

  return {
    get,
    isLoading,
    isFetching,
    isError,
    error,
  };
};

export const useApiGet = async <T>(url: string, sync: boolean = false) => {
  const data: Ref<T> = ref() as Ref<T>;
  const { get, isError, error, isLoading } = useApi(data);
  const { send } = get(url);

  if (sync) {
    return { data, send, isLoading };
  }
  await send();

  if (toValue(isError)) {
    throw new Error(toValue(error));
  }

  return toValue(data);
};
