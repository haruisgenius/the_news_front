<script>
export default {
  methods: {
    push(){  // emit往外丟
      this.$emit("pushOutside") //pushOutside > 接住方法
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="modal">
      <i class="fa-solid fa-xmark" @click="push"></i>
      <h2 class="modal-title">編輯標籤</h2>
      <!-- Modal 元件上開一個洞, 供父層使用 >父層<Modal>可當div使用 -->
        <!-- 渲染時父層此檔案標籤內東西會貼到<slot></slot>內 -->
      <slot></slot>
    </div>

    <div class="bg"></div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
      width: 50vw;
      height: 70vh;
      padding: 1rem;
      background-color: white;
      border-radius: 0.5rem;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      // .modal-title {
      //   margin-top: 1rem;
      // }
      
      i {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
    }

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: inherit;
      height: inherit;
      background-color: black;
      opacity: 0.8;
      z-index: -1;
    }
  }
</style>