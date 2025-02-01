<script setup lang="ts">
import { computed } from 'vue';
import type { OverviewDto } from '~/dto/overview.dto';
import { currencyToFloat, floatToString } from '~/utils/utils.js';

const props = defineProps<{
  data: OverviewDto['wallets'];
}>();
const walletsWithFloatBalance = computed(() => {
  return props.data.map((wallet) => ({
    ...wallet,
    balance: {
      ...wallet.balance,
      value: currencyToFloat(wallet.balance.value, {
        decimals: 2,
        slug: '',
        name: '',
        symbol: '',
      }),
    },
  }));
});
</script>

<template>
  <div class="container">
    <div class="container_head">
      <span>Wallets</span>
    </div>
    <div class="content_wallets">
      <div v-for="wallet in walletsWithFloatBalance" :key="wallet.id" class="wallet_item">
        <div class="container_name">
          <div class="color" :style="{ backgroundColor: wallet.color }"></div>
          <span class="wallet_name">{{ wallet.name }}</span>
        </div>
        <span class="wallet_balance"> {{ floatToString(wallet.balance.value) }} € </span>
      </div>
    </div>
    <div class="btn">
      <span>Gérer mes wallets</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/scss/style.scss';
.container {
  @include styleContainer;
  opacity: 0;
  transform: translateX(10px);
  animation: trans 800ms cubic-bezier(0.77, 0, 0.175, 1) forwards;
  animation-delay: 300ms;
  @keyframes trans {
    0% {
      opacity: 0;
      transform: translateX(10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .container_head {
    span {
      font-size: 18px;
    }
  }
  .content_wallets {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: -8px;
    .wallet_item {
      display: flex;
      justify-content: space-between;
      gap: 60px;
      .container_name {
        display: flex;
        align-items: center;
        gap: 8px;
        .color {
          width: 5px;
          height: 16px;
          border-radius: 3px;
        }
      }
      span {
        font-size: 14px;
        color:#333333;
      }
    }
  }
  .btn {
    margin-top: 20px;
    padding: 10px 65px;
    border: 1px solid #2e2eff;
    border-radius: 8px;
    transition: background-color 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
    span {
      color: #2e2eff;
      transition: color 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    &:hover {
      cursor: pointer;
      background-color: #2e2eff;
      span {
        color: #fff;
      }
    }
  }
}
</style>
