<script>
import Modal from './Modal.vue'

export default {
  components: {
    Modal,
  },
}
</script>

<template>
  <div class="tag-group">
    <div class="tag btn">
      DVD
    </div>
    <div class="tag btn">
      CD
    </div>
    <!-- <div class="tag btn modify-tag">編輯標籤</div> -->
  </div>
</template>

<style lang="scss" scoped>
.tag-group {
  margin-left: 1rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: end;

  .tag {
    margin-left: 0.5rem;
    padding: 0.1rem 0.5rem;
    background-color: #92B0FF;
    border: 0.1rem solid #5873B9;
    border-radius: 2rem;
    // align-items: center;
    text-align: center;

    transition: 0.3s;

    &:hover {
      cursor: pointer;
      scale: 1.05;
    }

    &:active {
      scale: 0.95;
    }
  }

  .modify-tag {
    background-color: #afc6ff;
    border: 0.1rem solid #5f78ba;
  }
}
</style>