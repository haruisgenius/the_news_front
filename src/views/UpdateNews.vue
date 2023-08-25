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
      isModalShow: false,   // 是否顯示彈跳視窗
      isMessageModalShow: false,   // 是否顯示訊息彈跳視窗
      title: '',            // 標題
      updateDate: '',       // 發布日期
      tags: '',             // 標籤
      content: '',          // 內容

      // 錯誤訊息
      titleError: '',          // 標題
      dateError: '',  // 時間錯誤
      tagsError: '',       // 標籤分類錯誤
      contentError: '',       // 內容錯誤

      // 檢查輸入內容
      isReadOnly: false,         // input是否唯讀
      inputReadOnlyShow: true,   // 顯示檢查input按鈕
      updateNewsBtnShow: false,   // 顯示發布input按鈕
      isUpdateAllow: false,         // 是否可發布
      modifyNewsBtnShow: false,     // 顯示返回修改input按鈕
    }
  },
  mounted() {
    this.isFindNews()
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
    isFindNews() {
      let serialNumber = this.$route.params.serialNumber
      let body = {
        serialNumber: serialNumber
      }
      console.log(body)
      fetch("http://localhost:8080/find_news", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.news)
          this.newsData = data.news
          this.title = this.newsData.title
          this.updateDate = this.newsData.updateDate
          this.tags = this.newsData.tags
          this.content = this.newsData.content
        })

      // find tags
      fetch("http://localhost:8080/find_all_tags")
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.tagsData = data.tagsList
          console.log(this.tagsData)
        })
    },
    updateNews() {
      let serialNumber = this.$route.params.serialNumber
      let body = {
        'serialNumber': serialNumber,
        'title': this.title,
        'updateDate': this.updateDate,
        'tags': this.tags,
        'content': this.content
      }
      fetch("http://localhost:8080/update_news", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.message)
          if(data.message) {
            this.isMessageModalShow = !this.isMessageModalShow
          }
        })
    },
    SwitchWindow() {
      this.isMessageModalShow = false
      // window.location.href = '/manager-home'
    }

  }
}
</script>

<template>
  <div class="create-news">

    <div class="back-to-news d-flex">
      <div @click="goBack()" class="go-back"><i class="fa-solid fa-angle-left me-1"></i>返回</div>
      <div class="tips ms-3">要按下方的確定按鈕才會暫存輸入內容哦！</div>
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
      <div class="all-tags">
        <div class="old-tags">
          <div class="one-tag">
            <input type="checkbox" name="" id="dvd">
            <label for="dvd">DVD</label>
          </div>
        </div>

        <div class="old-tags">
          <div class="one-tag">
            <input type="checkbox" name="" id="dvd">
            <label for="dvd">DVD</label>
          </div>
        </div>

        <div class="old-tags">
          <div class="one-tag">
            <input type="checkbox" name="" id="dvd">
            <label for="dvd">DVD</label>
          </div>
        </div>

        <div class="old-tags">
          <div class="one-tag">
            <input type="checkbox" name="" id="dvd">
            <label for="dvd">DVD</label>
          </div>
        </div>

        <div class="btn deleteBtn" @click="updateAnswer">刪除</div>
      </div>



      <br>

      <div class="create-tags">
        <label for="tag-input">新增標籤：</label>
        <input type="text" name="" id="tag-input">
        <div class="create-tags-btn">新增</div>
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

.deleteBtn {
  margin-top: 1rem;
  color: #424242;
  background-color: #c1c1c1;
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