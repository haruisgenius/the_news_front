<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink
  },
  props: {
    newsData: { // 為表格內容，必需為陣列形式
      type: Array,
      required: true
    },
    today: Date,   // 今天日期
    isUpdateNews: false,   // 是否顯示編輯消息
    isCreateNews: false,   // 是否顯示新增消息
    isUnupdateNews: false,   // 是否顯示尚未發布消息
  },
  data() {
    return {

    }
  },
}
</script>

<template>
  <div>
    <div class="create-btn list-group" v-if="isCreateNews">
      <RouterLink :to="`/create-news/`" class="create-news list-group-item list-group-item-action">
        新增
      </RouterLink>

    </div>
    <div class="list-group">

      <!-- one news -->
      <div class="a-news-area" v-for=" news in newsData">
        <!-- updated news -->
        <RouterLink :to="`/news-content/${news.serialNumber}`" v-if="news.updateDate < today"
          class="one-news list-group-item list-group-item-action" :key="news.serialNumber">
          <div class="text-area">
            <div class="time d-flex">
              <div class="update-time-p">{{ news.updateDate.toISOString().split('T')[0] }}</div>
              <div class="tags">{{ news.tags }}</div>
            </div>
            <div class="title-p">{{ news.title }}</div>
          </div>
        </RouterLink>

        <!-- unupdate news -->
        <RouterLink :to="`/create-news/${news.serialNumber}`" v-if="isUnupdateNews && news.updateDate > today"
          class="one-news list-group-item list-group-item-action">
          <div class="text-area">

            <div class="time d-flex">
              <div class="update-time-p">{{ news.updateDate.toISOString().split('T')[0] }}</div>
              <div class="unupdate-tags">{{ news.tags }}</div>
            </div>

            <div class="title-p unupdate-news">{{ news.title }}</div>
          </div>

          <div class="update-btn-area">
            <div class="update-btn">可編輯</div>
          </div>
        </RouterLink>


      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-btn {
  margin: 0;
}

.create-news {
  color: #0048ff;

  border: 1px solid #6994ff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-group {
  margin: 0;


  .one-news {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 4rem;

    .text-area {
      width: 85%;

      .update-time-p {
        font-size: 1rem;
      }

      .tags {
        margin-left: 0.5rem;
        padding: 0 0.35rem;
        background-color: #92B0FF;
        border: 0.1rem solid #5873B9;
        border-radius: 2rem;
        text-align: center;
      }

      .unupdate-tags {
        margin-left: 0.5rem;
        padding: 0 0.35rem;
        background-color: #c1d1f9;
        border: 0.1rem solid #7786ae;
        border-radius: 2rem;
        text-align: center;
      }

      .title-p {
        width: 100%;
        font-size: 1.5rem;
      }

      .unupdate-news {
        color: #545454;
      }

    }

    .update-btn-area {
      margin-left: 1rem;
      display: flex;
      align-items: center;

      .update-btn {
        padding: 0.3rem 0.6rem;
        color: #2500ab;
        font-size: 1rem;
        background-color: #6994ff;
        border-radius: 0.5rem;

        transition: 0.3s;

        &:hover {
          cursor: pointer;
          scale: 1.05;
        }

        &:active {
          scale: 0.95;
        }
      }
    }
  }

}
</style>