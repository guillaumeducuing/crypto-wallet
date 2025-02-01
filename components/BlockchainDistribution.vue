<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { TokenDto } from '~/dto/overview.dto';

const props = defineProps({
  data: {
    type: Object as () => { tokens: TokenDto[] },
    required: true,
  },
});

const blockchainDistribution = computed(() => {
  const totalValue = props.data.tokens.reduce((acc, token) => {
    return acc + parseFloat(token.values.current[0].value);
  }, 0);

  const blockchainMap: Record<string, { name: string; color: string; value: number }> = {};

  props.data.tokens.forEach((token) => {
    const blockchain = token.blockchain;
    const currentValue = parseFloat(token.values.current[0].value);

    if (blockchainMap[blockchain.slug]) {
      blockchainMap[blockchain.slug].value += currentValue;
    } else {
      blockchainMap[blockchain.slug] = {
        name: blockchain.name,
        color: blockchain.color,
        value: currentValue,
      };
    }
  });

  return Object.values(blockchainMap).map((blockchain) => ({
    ...blockchain,
    percentage: ((blockchain.value / totalValue) * 100).toFixed(1),
  }));
});
</script>

<template>
  <div class="container">
    <div class="container_head">
      <p>Répartition par blockchains</p>
    </div>
    <div class="container_distribution">
      <div v-for="blockchain in blockchainDistribution" :key="blockchain.name" class="distribution_item" :style="{ backgroundColor: blockchain.color, width: blockchain.percentage + '%',boxShadow: `0px 8px 10px ${blockchain.color}40` }">
        <span>{{ blockchain.name }}</span>
        <span>{{ blockchain.percentage }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/scss/style.scss';
.container {
  @include styleContainer;
  justify-content: flex-start;
  opacity: 0;
  transform: translateY(-20px);
  animation: trans 800ms cubic-bezier(0.77, 0, 0.175, 1) 500ms forwards;
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
    p {
      font-size: 18px;
    }
  }
  .container_distribution {
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
    .distribution_item {
      display: flex;
      justify-content: space-between;
      padding: 7px 12px;
      border-radius: 8px;
      min-width: 50px;
      overflow: hidden;
      span {
        font-size: 15px;
        font-weight: 500;
        color: #ffffff;
        &:last-child{
          font-weight: normal;
        }
      }
    }
  }
}
</style>
