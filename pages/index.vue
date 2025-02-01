<script setup lang="ts">
import type { Ref } from 'vue';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useApi } from '~/composables/useApi';
import type { OverviewDto } from '~/dto/overview.dto';

const data: Ref<OverviewDto> = ref({
  defaultCurrency: { slug: 'euro', name: 'Euro', symbol: '€', decimals: 2 },
  wallets: [],
  tokens: [],
});
const { get } = useApi(data);
gsap.registerPlugin(Draggable);

const storedPositions = ref<Record<string, { x: number, y: number }>>({});
const reset = ref<HTMLElement>();
onMounted(async () => {
  await get('https://delivery.miinded.com/example/overview.json').send();

  // Handle draggable elements with gsap (+ localStorage for keeping position)
  const draggableElements = document.querySelectorAll('.draggable');
  draggableElements.forEach((elem, index) => {
    const id = `draggable-${index}`;
    elem.setAttribute('id', id);
    const storedPosition = localStorage.getItem(id);
    if (storedPosition) {
      const { x, y } = JSON.parse(storedPosition);
      gsap.set(elem, { x, y });
      storedPositions.value[id] = { x, y };
    }
    Draggable.create(elem as HTMLElement, {
      onDragEnd: function () {
        const { x, y } = this.target._gsap;
        localStorage.setItem(id, JSON.stringify({ x, y }));
        storedPositions.value[id] = { x, y };
        if(hasStoredPositions?.value){
          reset?.value?.classList.add('active');
        }
        else{
          reset?.value?.classList.remove('active');
        }
      },
      onPress: function () {
        elem.classList.add('draggable_pressed');
      },
      onRelease: function () {
        elem.classList.remove('draggable_pressed');
      },
    });
  });
  if(hasStoredPositions?.value){
    reset?.value?.classList.add('active');
  }
});

// Check if there is stored positions
const hasStoredPositions = computed(() => {
  return Object.keys(storedPositions.value).length > 0;
});

// Reset layout
const handleResetLayout = () => {
  Object.keys(storedPositions.value).forEach(id => {
    const elem = document.getElementById(id);
    if (elem) {
      gsap.to(elem, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
      localStorage.removeItem(id);
    }
  });
  storedPositions.value = {};
  reset?.value?.classList.remove('active');
}
</script>

<template>
  <div class="container">
    <div class="container_datas">
      <div class="container_head">
        <div class="total draggable">
          <TotalValue v-if="data.tokens.length" :data="data" />
        </div>
        <div class="distribution draggable">
          <TypeDistribution v-if="data.tokens.length" :data="data" />
        </div>
      </div>
      <div class="draggable">
        <BlockchainDistribution v-if="data.tokens.length" :data="data" />
      </div>
    </div>
    <div class="container_wallets draggable">
      <Wallet v-if="data.wallets.length" :data="data.wallets" />
    </div>
      <div class="reset" ref="reset" @click="handleResetLayout">
      <span>Restaurer la mise en page</span>
    </div>
    <Modal />
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  gap: 18px;
  height: 100%;
  .container_datas {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 18px;
    .container_head {
      display: flex;
      gap: 18px;
    }
  }
  .total {
    flex: 1;
  }
  .distribution {
    flex: 2;
  }
  .draggable {
    z-index: 1;
    background: #fff;
    border-radius: 12px;
    &.draggable_pressed {
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    }
  }
  .reset{
    position: fixed;
    z-index: 1000;
    transform: translate(-50%, 100%);
    bottom: 0;
    left: 50%;
    transition: transform 800ms cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
    color : #2e2eff;
    border: 1px solid #2e2eff;
    border-radius: 8px;
    padding: 5px 10px;
    &.active{
      transform: translate(-50%, 0);
      bottom: 10px;
    }
    &:hover{
      cursor: pointer;
      background-color: #2e2eff;
      color: #fff;
    }
  }
}
</style>
