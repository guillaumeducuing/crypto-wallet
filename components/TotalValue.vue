<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { OverviewDto } from '~/dto/overview.dto';
import { currencyToFloat, floatToString } from '~/utils/utils.js';

const props = defineProps<{
  data: OverviewDto;
}>();

const finalTotal = computed(() => {
  const { tokens, defaultCurrency } = props.data;
  if (!tokens || tokens.length === 0) return "0";

  const sum = tokens.reduce((acc, token) => {
    const currentValue = parseFloat(token.values.current[0]?.value) || 0;
    return acc + currentValue;
  }, 0);

  const total = currencyToFloat(sum.toString(), defaultCurrency);
  return floatToString(total);
});
</script>

<template>
  <div class="container">
    <div class="container_head">
      <span>Valeur totale</span>
    </div>
    <div class="container_value">
      <p>{{ finalTotal }} €</p>
      <div class="trending">
        <Icon name="trending-up" size= 20 color="#008400" />
          <span>+4.7%</span></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/scss/style.scss';
.container {
  @include styleContainer;
  flex: 1;
  opacity: 0;
  transform: translateY(-20px);
  animation: trans 800ms cubic-bezier(0.77, 0, 0.175, 1) forwards;
  animation-delay: 300ms;
  @keyframes trans {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .container_head {
    @include styleContainerHead;
  }
  .container_value {
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
      font-size: 34px;
      line-height: 110%;
    }
    .trending {
      display: flex;
      gap: 8px;
      span {
        color: #008400;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
}
</style>
