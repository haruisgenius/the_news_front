<script>
</script>

<template>
  <div class="news-content">
    <div class="back-to-news">
      <a href="/">回到最新消息</a>
    </div>
    <div class="news">

      <div class="news-detail">
        <p class="title">Title</p>
        <p class="date">2023/08/12</p>
      </div>
      <div class="content">
        <p>content</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration-line: none;
  color: #535353;

  transition: 0.3s;

  &:hover {
    cursor: pointer;
    scale: 1.05;
  }

  &:active {
    scale: 0.95;
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
    margin: 1rem 0;
  
    p{
      margin: 0;
      font-size: 1.2rem;
    }
  }

}
</style>