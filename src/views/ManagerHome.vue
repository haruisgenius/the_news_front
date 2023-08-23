<script>
import NewList from '../components/NewsList.vue'
import TagList from '../components/TagList.vue'

export default {
  components: {
    NewList,
    TagList,
  },
  data() {
    return {
      newsData: [],   // 消息內容
      tagsData: [],   // 標籤內容
      isSwitchUser: false,   // 是否顯示(切換)管理者
      isSwitchManager: true,   // 是否顯示(切換)使用者
    
      isUpdateNews: true,   // 是否顯示編輯消息
      isCreateNews: true,   // 是否顯示新增消息
      isUnupdateNews: true,   // 是否顯示尚未發布消息

    }
  },
  mounted() {

  },
  methods: {
    findAllNews() {

    },
    findAllTags() {

    },
  },
  watch: {
    
  },
  computed: {
    
  }
}
</script>

<template>
  <div class="manager-home">
    <div class="home-top">
      <p class="home-title">最新消息</p>
      <TagList />
    </div>
    <div class="home-main">
      <NewList :isUpdateNews="isUpdateNews" :isCreateNews="isCreateNews" :isUnupdateNews="isUnupdateNews" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-top {
  display: flex;

  .home-title {
    margin: 0;
    font-size: 2.5rem;
  }
}
</style>