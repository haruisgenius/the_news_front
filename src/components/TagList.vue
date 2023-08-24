<script>
export default {
  props: {
    tagsData: { // 為表格內容，必需為陣列形式
      type: Array,
      required: true
    },
  },
  data() {
    return {

    }
  },
  methods: {
    console() {
      console.log("tagsData")
    }
  },
  mounted() {
    this.console();
  }
}
</script>

<template>
  <div class="tag-group">
    <!-- <input type="button" value=""> -->
    <input type="button" class="tag btn" :data-value="tag.tags" v-for="tag in tagsData" :key="tag.tagsNumber">
      {{ tag.tags }}
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