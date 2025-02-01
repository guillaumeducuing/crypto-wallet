<script setup lang="ts">
import { ref } from 'vue';

const modal = ref<HTMLElement>();

const handleOpenModal = () => {
  modal.value?.classList.add('open');
};

const handleLeaveModal = () => {
  setTimeout(() => {
    modal.value?.classList.remove('open');
  }, 500);
};
</script>

<template>
  <div ref="modal" class="modal" @mouseleave="handleLeaveModal()">
    <div class="modal_info" @mouseenter="handleOpenModal()">
      <span>Hello ! 👋</span>
    </div>
    <div class="modal_content">
      <span>Vous pouvez déplacer les élements pour réorganiser la page en faisant un drag'n'drop !</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  bottom: 10px;
  right: 10px;
  transform: translate(0, 125px);
  transition: transform 800ms cubic-bezier(0.165, 0.84, 0.44, 1) 100ms;
  width: 300px;
  &.open {
    transform: translate(0, 0);
  }
  .modal_info {
    text-align: right;
    background: #2e2eff;
    padding: 10px 15px;
    border-radius: 10px 10px 0 0;
    span {
      color: #fff;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .modal_content {
    z-index: 1;
    background: #fff;
    background: #2e2eff;
    border-radius: 10px 0 10px 10px;
    padding: 20px;
    color: #fff;
  }
}
</style>
