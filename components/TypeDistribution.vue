<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { TokenDto } from '~/dto/overview.dto';
import { currencyToFloat, floatToString } from '~/utils/utils.js';

const props = defineProps({
  data: {
    type: Object as () => { tokens: TokenDto[] },
    required: true,
  },
});

// Calculate value of each type
const totalValue = computed(() => {
  let cryptoTotal = 0 as number;
  let nftTotal = 0 as number;

  props.data.tokens.forEach((token: { values: { current: { value: string }[] }; token: { type: string } }) => {
    const currentValue = parseFloat(token.values.current[0].value);
    if (token.token.type === 'CRYPTO') {
      cryptoTotal += currentValue;
    } else if (token.token.type === 'NFT') {
      nftTotal += currentValue;
    }
  });
  const nftTotalToFloat = currencyToFloat(nftTotal as unknown as string, {
    decimals: 2,
    slug: '',
    name: '',
    symbol: '',
  });
  const cryptoTotalToFloat = currencyToFloat(cryptoTotal as unknown as string, {
    decimals: 2,
    slug: '',
    name: '',
    symbol: '',
  });
  return { cryptoTotal, nftTotal, nftTotalToFloat, cryptoTotalToFloat };
});

// Define percentages
const percentages = computed(() => {
  const { cryptoTotal, nftTotal } = totalValue.value;
  const total = cryptoTotal + nftTotal;
  const cryptoPercentage = (cryptoTotal / total) * 100;
  const nftPercentage = (nftTotal / total) * 100;

  return {
    cryptoPercentage: isNaN(cryptoPercentage) ? 0 : cryptoPercentage.toFixed(1),
    nftPercentage: isNaN(nftPercentage) ? 0 : nftPercentage.toFixed(1),
  };
});
</script>

<template>
  <div class="container">
    <div class="container_head">
      <span>Répartition par type</span>
    </div>
    <div class="container_distribution">
      <div class="container_head">
        <div class="distribution_item" :style="{ backgroundColor: '#F4B947', width: percentages.cryptoPercentage + '%',boxShadow: '0px 8px 10px #F4B94740' }">
          <span>Crypto</span>
          <span>{{ percentages.cryptoPercentage }}%</span>
        </div>
        <div class="distribution_item" :style="{ backgroundColor: '#2BBF7D', width: percentages.nftPercentage + '%',boxShadow: '0px 8px 10px #2BBF7D40' }">
          <span>NFT</span>
          <span>{{ percentages.nftPercentage }}%</span>
        </div>
      </div>
      <div class="container_total">
        <span> {{ floatToString(totalValue.cryptoTotalToFloat) }} €</span>
        <span>{{ floatToString(totalValue.nftTotalToFloat) }} €</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/scss/style.scss';
.container {
  @include styleContainer;
  justify-content: flex-start;
  flex: 2;
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
  .container_distribution {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .container_head {
      display: flex;
      gap: 8px;
    }
    .distribution_item {
      display: flex;
      justify-content: space-between;
      padding: 7px 12px;
      border-radius: 8px;
      min-width: 160px;
      span {
        font-size: 15px;
        font-weight: 500;
        color: #ffffff;
          &:last-child{
          font-weight: normal;
        }
      }
    }
    .container_total {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 18px;
        font-weight: 500;
        color: #0e101c;
        
      }
    }
  }
}
</style>
