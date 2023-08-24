<script>
import Modal from '../components/Modal.vue'

export default {
  components: {
    Modal,
  },
  data() {
    return {
      isModalShow: false,
      title: '',    // 標題
      updateDate: (new Date()).getTime(),    // 發布日期
      tags: '',    // 標籤
      content: '',    // 內容

      isReadOnly: false,  // 答案唯讀
      createAnsBtnShow: false,  // 顯示提交答案按鈕
      inputReadOnlyShow: true,  // 顯示檢查答案按鈕
      updateAnsBtn: false,  // 顯示返回修改答案按鈕
    }
  },
  mounted() {
    this.isFindNews();
  },
  methods: {
    switchModal() {
      this.isModalShow = !this.isModalShow
    },
    goBack() {
      this.$router.go(-1)
    },
    isFindNews() {
      let serialNumber = this.$route.params.serialNumber
      // console.log(serialNumber)
      if (serialNumber) {
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
            console.log(data)
          })
      } else {
        console.log("沒有news")
      }
    }
  }
}
</script>

<template>
  <div class="create-news">

    <div class="back-to-news">
      <div @click="goBack()" class="go-back">返回</div>
    </div>

    <div class="create">
      <div class="first-area one-area">
        <label for="title">標題</label>
        <input type="text" class="title-input" name="" id="title">
        <label for="title" class="error-text">請輸入標題</label>
      </div>

      <div class="second-area one-area">
        <label for="date">發布日期</label>
        <input type="date" class="date-input" name="" id="date">
        <label for="date" class="error-text">發布日期不可早於今天</label>
      </div>

      <div class="third-area one-area">
        <div class="tag-input d-flex">
          <label for="content">標籤</label>
          <div class="choose-tag">

          </div>
          <!-- 編輯 -->

        </div>
        <div class="tag-list d-flex">
          <div class="modify-tag">
            <div class="btn modify-btn" @click="switchModal">編輯標籤</div>
          </div>
        </div>
      </div>

      <div class="four-area one-area">
        <label for="content">內容</label>
        <div class="input-and-error">
          <label for="content" class="error-text">內容不可為空</label>
          <textarea class="content-input" name="" id="content" cols="5" rows="20"></textarea>

        </div>
      </div>
    </div>

    <div class="check-btn">

      <!-- v-if="inputReadOnlyShow" -->
      <div class="check-up">
        <div class="btn check-up-btn" @click="inputReadOnly">確定</div>
      </div>

      <!--  v-if="createAnsBtnShow || updateAnsBtn" -->
      <div class="modify-or-update">
        <!--  v-if="updateAnsBtn" -->
        <div class="btn modifyBtn" @click="updateAnswer">修改</div>
        <!--  v-if="createAnsBtnShow" -->
        <div class="btn update-btn" @click="createAnswer">發布</div>
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
        <label for="tag-input">新標籤：</label>
        <input type="text" name="" id="tag-input">
        <div class="create-tags-btn">新增</div>
      </div>
    </Modal>
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
      width: 60%;
      height: 3rem;
      margin-left: 4rem;
      background-color: #fff;
      border: 1px solid #6a6a6a;
      border-radius: 1px;

    }

    .modify-tag {
      margin-left: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .modify-btn {
        height: 1.8rem;
        width: 5.8rem;
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


    .tag-list {
      margin-left: 6rem;
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
</style>