<script>
import Modal from '../components/Modal.vue';
import MessageModal from '../components/messageModel.vue';

export default {
  components: {
    Modal,
    MessageModal,
  },
  data() {
    return {
      newsData: [],         // 消息內容
      tagsData: [],         // 標籤內容
      deleteTagsList: [],         // 刪除標籤list
      isModalShow: false,   // 是否顯示彈跳視窗
      isMessageModalShow: false,   // 是否顯示訊息彈跳視窗
      title: '',            // 標題
      updateDate: '',       // 發布日期
      tags: '',             // 標籤
      content: '',          // 內容
      createTagsInput: '',   // 新增標籤輸入框

      // 錯誤訊息
      titleError: '',          // 標題
      dateError: '',           // 時間錯誤
      tagsError: '',           // 標籤分類錯誤
      contentError: '',        // 內容錯誤

      // 檢查輸入內容
      isReadOnly: false,         // input是否唯讀
      inputReadOnlyShow: true,   // 顯示檢查input按鈕
      updateNewsBtnShow: false,   // 顯示發布input按鈕
      isUpdateAllow: false,         // 是否可發布
      modifyNewsBtnShow: false,     // 顯示返回修改input按鈕
    }
  },
  mounted() {
    this.findTags();
    this.getToday()
  },
  methods: {
    switchModal() {
      this.isModalShow = !this.isModalShow
    },
    inputReadOnly() {
      this.isReadOnly = true;   // input唯獨
      this.inputReadOnlyShow = false;  // 檢查輸入內容btn隱藏
      this.updateNewsBtnShow = true;   // 發布btn顯示
      this.modifyNewsBtnShow = true;   // 返回修改btn顯示

      // 防呆: 檢查是否都有輸入內容，否則顯示錯誤訊息
      if (!this.title) {
        this.titleError = '請輸入標題'
        this.isUpdateAllow = true
        this.updateNewsBtnShow = false
      } else { this.titleError = '' }
      if (!this.updateDate) {
        this.dateError = '發布日期不可早於今天'
        this.isUpdateAllow = true
        this.updateNewsBtnShow = false
      } else { this.dateError = '' }
      if (!this.tags) {
        this.tagsError = '請選擇標籤分類'
        this.isUpdateAllow = true
        this.updateNewsBtnShow = false
      } else { this.tagsError = '' }
      if (!this.content) {
        this.contentError = '請輸入內容'
        this.isUpdateAllow = true
        this.updateNewsBtnShow = false
      } else { this.contentError = '' }

      // 若防呆都通過
      if (!this.titleError && !this.dateError && !this.tagsError && !this.contentError) {
        this.isUpdateAllow = false
        this.updateNewsBtnShow = true

        let news = {
          'title': this.title,
          'updateDate': this.updateDate,
          'tags': this.tags,
          'content': this.content
        }

        sessionStorage.setItem('news', JSON.stringify(news))
        console.log(sessionStorage.getItem('news'))
      }

    },
    modifyNews() {
      this.isReadOnly = false;
      this.inputReadOnlyShow = true;  // 檢查輸入內容btn顯示
      this.updateNewsBtnShow = false;   // 發布btn隱藏
      this.modifyNewsBtnShow = false;   // 返回修改btn隱藏
    },
    goBack() {
      this.$router.go(-1)
    },
    getToday() {
      let ddd = new Date();
      let day = ("0" + ddd.getDate()).slice(-2)
      let month = ("0" + (ddd.getMonth() + 1)).slice(-2)
      let today = ddd.getFullYear() + "-" + (month) + "-" + (day)
      console.log(today)
      this.updateDate = today
    },
    findTags() {
      //   let serialNumber = this.$route.params.serialNumber
      //   // console.log(serialNumber)
      //   if (serialNumber) {
      //     let body = {
      //       serialNumber: serialNumber
      //     }
      //     console.log(body)
      //     fetch("http://localhost:8080/find_news", {
      //       method: "POST",
      //       headers: {
      //         "Content-type": "application/json"
      //       },
      //       body: JSON.stringify(body)
      //     })
      //       .then(res => res.json())
      //       .then(data => {
      //         console.log(data.news)
      //         this.newsData = data.news
      //         this.title = this.newsData.title
      //         this.updateDate = this.newsData.updateDate
      //         this.tags = this.newsData.tags
      //         this.content = this.newsData.content
      //       })
      //   }

      // find tags
      fetch("http://localhost:8080/find_all_tags")
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.tagsData = data.tagsList
          console.log(this.tagsData)
        })

      // 判斷session storage內是否有尚未發布的news
      let sessionNews = sessionStorage.getItem('news')
      if (sessionNews) {
        sessionNews = JSON.parse(sessionNews)
        console.log(sessionNews)
        this.title = sessionNews.title
        this.updateDate = sessionNews.updateDate
        this.tags = sessionNews.tags
        this.content = sessionNews.content
      }
    },
    updateNews() {
      let body = JSON.parse(sessionStorage.getItem('news'))

      fetch("http://localhost:8080/create_news", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.isMessageModalShow = true
        })
      sessionStorage.removeItem('news')
      window.location.href = '/manager-home'
    },
    SwitchWindow() {
      this.isMessageModalShow = false
      // window.location.href = '/manager-home'
    },
    deleteTags() {
      let tagsList = this.deleteTagsList
      if (tagsList.length > 0) {
        console.log(this.deleteTagsList)
        let body = {
          tagsList: tagsList
        }

        fetch("http://localhost:8080/delete_tags", {
          method: "DELETE",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
          })

        window.location.reload()

      }
    },
    createTags() {
      if(this.createTagsInput) {
        let body = {
          tagsName : this.createTagsInput
        }
        fetch("http://localhost:8080/create_tags", {
          method: "POST",
          headers: {
            "Content-type" : "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            window.location.reload()
          })
      }
    }

  }
}
</script>

<template>
  <div class="create-news">

    <div class="back-to-news d-flex">
      <div @click="goBack()" class="go-back"><i class="fa-solid fa-angle-left me-1"></i>返回</div>
      <div class="tips ms-3">要按下面確定按鈕才會暫存輸入內容哦！</div>
    </div>

    <div class="create">
      <div class="first-area one-area">
        <label for="title">標題</label>
        <input type="text" class="title-input" name="" v-model="title" id="title" :disabled="isReadOnly">
        <label for="title" class="error-text">{{ titleError }}</label>
      </div>

      <div class="second-area one-area">
        <label for="date">發布日期</label>
        <input type="date" class="date-input" name="" v-model="updateDate" id="date" :disabled="isReadOnly">
        <label for="date" class="error-text">{{ dateError }}</label>
      </div>

      <div class="third-area one-area">
        <div class="tag-input d-flex">
          <label for="tags">標籤</label>
          <div class="choose-tag">
            <select class="select-box" v-model="tags" name="" id="tags" :disabled="isReadOnly">
              <option value="" disabled selected>請選擇文章分類標籤</option>
              <option class="tag" :value="tag.tags" @click="getTagsValue(tag.tags)" v-for="tag in this.tagsData"
                :key="tag.tagsNumber">{{ tag.tags }}</option>
            </select>
            <!-- 編輯 -->
            <div class="btn modify-btn" @click="switchModal">編輯標籤</div>
            <label for="tags" class="error-text">{{ tagsError }}</label>
          </div>
        </div>
      </div>

      <div class="four-area one-area">
        <label for="content">內容</label>
        <div class="input-and-error">
          <label for="content" class="error-text">{{ contentError }}</label>
          <textarea class="content-input" name="" id="content" v-model="content" cols="5" rows="9"
            :disabled="isReadOnly"></textarea>

        </div>
      </div>
    </div>

    <div class="check-btn">

      <!-- v-if="inputReadOnlyShow" -->
      <div class="check-up">
        <div class="btn check-up-btn" @click="inputReadOnly" v-if="inputReadOnlyShow">確定</div>
      </div>

      <div class="modify-or-update" v-if="modifyNewsBtnShow || updateNewsBtnShow">
        <div class="btn modifyBtn" @click="modifyNews" v-if="modifyNewsBtnShow">修改</div>
        <div class="btn update-btn" @click="updateNews" v-if="updateNewsBtnShow">發布</div>
        <div class="cannot-update" v-if="isUpdateAllow">不可發布</div>
      </div>

    </div>

    <Modal v-if="isModalShow" @pushOutside="switchModal">
      <p class="tips">標籤分類 ( 文章數 )</p>
      <div class="all-tags">
        <div class="old-tags" v-for="tag in this.tagsData">
          <div class="one-tag" v-if="tag.amount > 0">
            <input type="checkbox" name="" :id="tag.tags" :value="tag.tags" v-model="deleteTagsList" disabled>
            <label :for="tag.tags">{{ tag.tags }} ( {{ tag.amount }} )</label>
          </div>
          <div class="one-tag" v-else>
            <input type="checkbox" name="" :id="tag.tags" :value="tag.tags" v-model="deleteTagsList">
            <label :for="tag.tags">{{ tag.tags }} ( {{ tag.amount }} )</label>
          </div>
        </div>

        <div class="delete">
          <div class="btn deleteBtn" @click="deleteTags">刪除</div>
          <p class="tips">文章數目不為0的標籤才能刪哦!</p>
        </div>

      </div>



      <br>

      <div class="create-tags">
        <label for="tag-input">新增標籤：</label>
        <input type="text" name="" id="tag-input" v-model="createTagsInput">
        <div class="create-tags-btn" @click="createTags">新增</div>
      </div>
    </Modal>

    <MessageModal v-if="isMessageModalShow" @getReady="SwitchWindow">
      <div class="success">
        <h2>發布成功</h2>
      </div>
    </MessageModal>
  </div>
</template>

<style lang="scss" scoped>
.go-back {
  text-decoration-line: none;
  color: #535353;

  transition: 0.3s;

  &:hover {
    cursor: pointer;
    scale: 1.005;
  }

  &:active {
    scale: 0.99;
  }
}

.tips {
  color: #535353;
  font-size: 0.5rem;
  display: flex;
  align-items: end;
  margin: 0;
}

.create {
  padding: 0 2rem;

  .one-area {
    display: flex;
    // justify-content: space-between;
    margin-top: 1rem;

    label {
      margin: 0;
      font-size: 1.3rem;
    }

    .error-text {
      margin-left: 1rem;
      color: #ff0000;
    }

    .title-input {
      margin-left: 4rem;
      width: 60%;
    }

    .date-input {
      width: 25%;
      margin-left: 2rem;
    }

    .input-and-error {
      display: flex;
      flex-direction: column;
      width: 85%;
      margin-left: 4rem;
    }
  }

  .third-area {
    flex-direction: column;

    .choose-tag {
      margin-left: 4rem;
      display: flex;

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

      .modify-btn {
        height: 1.8rem;
        width: 5.8rem;
        margin-left: 1rem;
        background-color: #afc6ff;
        border: 0.1rem solid #5f78ba;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
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
    }

    // .modify-tag {
    //   margin-left: 0.5rem;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;

    // }


    // .tag-list {
    //   margin-left: 6rem;
    // }
  }

}

.check-btn {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .btn {
    transition: 0.3s;

    &:hover {
      cursor: pointer;
      scale: 1.05;
    }

    &:active {
      scale: 0.95;
    }
  }

  .check-up {
    width: 20%;
    display: flex;
    justify-content: end;

    .check-up-btn {
      color: #0033ff;
      font-size: 1rem;
      background-color: #a1bcff;
    }
  }

  .modify-or-update {
    width: 20%;
    display: flex;
    justify-content: space-between;

    .update-btn {
      color: #2500ab;
      font-size: 1rem;
      background-color: #6994ff;
    }

    .cannot-update {
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
      border-radius: 0.5rem;
      color: #3302e1;
      font-size: 1rem;
      background-color: #96b4ff;

      &:hover {
        cursor: default;
      }
    }

    .modifyBtn {
      color: #424242;
      background-color: #c1c1c1;
    }
  }


}

// Modal

.all-tags {
  display: flex;
  flex-direction: column;
  align-items: center;

  .old-tags {
    padding: 0.5rem 0.7rem;
    background-color: #75aaff;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    label {
      margin-left: 1rem;
      color: #0023b1;
    }

    input {
      width: 1rem;
      height: 1rem;
    }

  }

  .delete {
    display: flex;
    flex-direction: column;
    align-items: center;

    .deleteBtn {
      margin-top: 1rem;
      color: #990000;
      background-color: #ffa5a5;
      // border: 2px solid #ff0000;

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


.create-tags {
  width: 70%;
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;

  label {
    display: flex;
    align-items: center;
  }

  .create-tags-btn {
    padding: 0.4rem 0.7rem;
    border-radius: 0.5rem;
    color: #0033ff;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #a1bcff;

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

// MessageModal
.success {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>