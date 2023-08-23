<script>
import { RouterLink, RouterView } from 'vue-router'
import HeaderView from './components/Header.vue'
import FooterView from './components/Footer.vue'

export default {
  components: {
    HeaderView,
    FooterView
  }
}
</script>

<template>
  <div class="all-warp">
    <HeaderView />
    <div class="router-vue-warp">
      <RouterView />

    </div>
    <FooterView />
  </div>
</template>

<style scoped>
.all-warp {
  width: 100%;
  background-color: #efefef;

  .router-vue-warp {
    margin: 1rem 0;
    padding: 0 6rem;
  }
}
</style>
