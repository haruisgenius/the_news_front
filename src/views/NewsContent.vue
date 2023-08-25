<script>
export default {
  data() {
    return {
      news: []
    }
  },
  mounted() {
    this.findNews()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    findNews() {
      // 拿網址內的消息代號
      let serialNumber = this.$route.params.serialNumber
      console.log(serialNumber)
      let body = {
        serialNumber : serialNumber
      }
      fetch("http://localhost:8080/find_news", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.news)
          this.news = data.news
        })
    }
  },
  watch: {
    
  },
  computed: {
    
  }
}
</script>

<template>
  <div class="news-content">
    <div class="back-to-news">
      <div @click="goBack()" class="go-back"><i class="fa-solid fa-angle-left me-1"></i>回到最新消息</div>
    </div>

    <div class="news">

      <div class="news-detail">
        <p class="title">{{ this.news.title }}</p>
        <p class="date">{{ this.news.updateDate }}</p>
      </div>
      <div class="content">
        <p>{{ this.news.content }}</p>
      </div>
    </div>

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

.news {
  padding: 0 2rem;

  .news-detail {
    margin-top: 1rem;
  
    p {
      margin: 0;
    }
  
    .title {
      font-size: 2.5rem;
    }
  
    .date {
      font-size: 0.9rem;
    }
  }
  
  .content {
    margin-top: 2rem;
    padding-bottom: 12rem;
  
    p{
      margin: 0;
      font-size: 1.2rem;
    }
  }

}
</style>