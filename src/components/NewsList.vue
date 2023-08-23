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
    isUpdateNews: false,   // 是否顯示編輯消息
    isCreateNews: false,   // 是否顯示新增消息
    isUnupdateNews: false,   // 是否顯示尚未發布消息
  },
  deta() {
    return {

    }
  }
}
</script>

<template>
  <div>
    <div class="create-btn list-group" v-if="isCreateNews">
      <RouterLink :to="`/create-news/${ serialNumber }`" class="create-news list-group-item list-group-item-action">
        新增
      </RouterLink>

    </div>
    <div class="list-group">

      <!-- one news -->
      <RouterLink :to="`/create-news/${ serialNumber }`" class="one-news list-group-item list-group-item-action">
        <div class="text-area">
          <div class="update-time-p">2023/08/23</div>
          <div class="title-p">Title</div>
        </div>

        <!-- <div class="update-btn-area">
          <div class="update-btn">編輯</div>
        </div> -->
      </RouterLink>


      <!-- unupdate news -->
      <RouterLink :to="`/create-news/${ serialNumber }`" class="one-news list-group-item list-group-item-action" v-if="isUnupdateNews">
        <div class="text-area">
          <div class="update-time-p unupdate-news">2023/11/01</div>
          <div class="title-p unupdate-news">Title</div>
        </div>

        <div class="update-btn-area">
          <div class="update-btn">編輯</div>
        </div>
      </RouterLink>

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
        width: 100%;
        font-size: 1rem;
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