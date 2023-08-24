<script>
import NewsList from '../components/NewsList.vue'
import TagsList from '../components/TagList.vue'

export default {
  components: {
    NewsList,
    TagsList,
  },
  data() {
    return {
      newsData: [],   // 消息內容
      tagsData: [],   // 標籤內容
      today: (new Date()).getTime(),  // 今天日期
      isSwitchUser: false,   // 是否顯示(切換)管理者
      isSwitchManager: true,   // 是否顯示(切換)使用者

      isUpdateNews: true,   // 是否顯示編輯消息
      isCreateNews: true,   // 是否顯示新增消息
      isUnupdateNews: true,   // 是否顯示尚未發布消息

      // 篩選
      tagsText: '',   // 標籤關鍵字

    }
  },
  mounted() {
    this.findAllTags();
    this.findAllNews();
  },
  methods: {
    findAllNews() {
      fetch("http://localhost:8080/find_all_news")
        .then(res => res.json())
        .then(data => {
          this.newsData = data.newsList
          console.log(this.newsData)
          this.newsData.forEach(item => {
            item.updateDate = new Date(item.updateDate)
            // console.log(item.updateDate)
          })
        })
    },
    findAllTags() {
      fetch("http://localhost:8080/find_all_tags")
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.tagsData = data.tagsList
          console.log(this.tagsData)
        })
    },
    updatefileredData() {
      let keyTags = ''
      let newData = this.newsData
      if(this.tagsText) {
        keyTags = this.tagsText
        newData = newData.filter(item => item.tags.includes(keyTags))
      }
      return newData
    }
  },
  watch: {
    tagsText: function (newText, oldText) {
      this.updatefileredData();
    }
  },
  computed: {
    filteredData() {
      let keyTags = ''
      let newData = this.newsData
      if(this.tagsText) {
        keyTags = this.tagsText
        newData = newData.filter(item => item.tags.includes(keyTags))
      }
      return newData
    }
  }
}
</script>

<template>
  <div class="manager-home">
    <div class="home-top">
      <p class="home-title">最新消息</p>
      <!-- <TagsList  :tagsList="tagsList" /> -->
      <div class="tags-list">
        <div class="tags-p">選擇標籤：</div>
        <select class="select-box" name="" id="" v-model="tagsText">
          <option value="">全部</option>
          <option class="tag" :value="tag.tags" @click="getTagsValue(tag.tags)" v-for="tag in this.tagsData"
            :key="tag.tagsNumber">{{ tag.tags }}</option>
        </select>
        <!-- <input type="button" class="tag btn" v-for="tag in this.tagsData" :key="tag.tagsNumber">
      {{ tag.tags }} -->

      </div>
    </div>
    <div class="home-main">
      <NewsList :newsData="filteredData" :today="today" :isUpdateNews="isUpdateNews" :isCreateNews="isCreateNews"
        :isUnupdateNews="isUnupdateNews" />
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

  .tags-list {
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .tags-p {
      color: #234bb1;
    }


    .select-box {
      margin-left: 0.5rem;
      padding: 0.1rem 0.5rem;
      background-color: #92B0FF;
      border: 0.1rem solid #5873B9;
      border-radius: 2rem;
      text-align: center;
  
      transition: 0.3s;
  
      &:hover {
        cursor: pointer;
        scale: 1.05;
      }
  
      .tag {
        margin-left: 0.5rem;
        padding: 0.1rem 0.5rem;
        background-color: #92B0FF;
        border: 0.1rem solid #5873B9;
        border-radius: 2rem;
        text-align: center;
      }
    }
  }

}
</style>