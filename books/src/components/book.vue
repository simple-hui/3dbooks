<template>
  <div class="book">
    <div class="content">
      <ul class="pages">
        <li class="paper" data-left>
          <div class="page page-1-back">
            <img src="/static/1.jpeg" />
          </div>
          <div class="page page-1">
            <img src="/static/2.jpeg" />
          </div>
        </li>
        <li class="paper" data-right>
          <div class="page page-2">
            <img src="/static/3.jpeg" />
          </div>
          <div class="page page-2-back">
            <img src="/static/4.jpeg" />
          </div>
        </li>
        <li class="paper">
          <div class="page page-2">
            <img src="/static/1.jpeg" />
          </div>
          <div class="page page-2-back">
            <img src="/static/2.jpeg" />
          </div>
        </li>
        <li class="paper">
          <div class="page page-2">
            <img src="/static/4.jpeg" />
          </div>
          <div class="page page-2-back">
            <img src="/static/3.jpeg" />
          </div>
        </li>
      </ul>
    </div>
    <button id="next-page">翻页</button>
  </div>
</template>

<script>
export default {
  name: 'book',
  data () {
    return {
      
    }
  },
  mounted() {
    let currentPage = 1;
    let $ = document.querySelector.bind(document);
    $('#next-page').addEventListener('click', goToNextPage);
    const flipAnimateTime = 100;
    function goToNextPage () {
      // 触发CSS动画
      $('.paper[data-right]').setAttribute('data-begin-animate', true);
        setTimeout(() => {
          // data-right变成data-left
          let $rightPaper = $('.paper[data-right]'),
              $leftPaper = $('.paper[data-left]');
          $rightPaper.removeAttribute('data-right');
          $rightPaper.setAttribute('data-left', true);
          // data-left没有了
          $leftPaper.removeAttribute('data-left');
          $leftPaper.querySelector('.page-1').classList.remove('page-1');
          $leftPaper.querySelector('.page-1-back').classList.remove('page-1-back');
          // 重新设置类的关系
          $leftPaper = $rightPaper;
          $rightPaper = $leftPaper.nextElementSibling;
          console.log($rightPaper);
          $leftPaper.querySelector('.page').classList.add('page-1-back');
          $leftPaper.querySelector('.page + .page').classList.add('page-1');
          // 如果还有下一页
          if ($rightPaper) {
              $rightPaper.setAttribute('data-right', true);
              $rightPaper.querySelector('.page').classList.add('page-2');
              $rightPaper.querySelector('.page + .page').classList.add('page-2-back');
          }   
          currentPage++;
        }, flipAnimateTime);
    }
  }
}
</script>

<style scoped>
  * {
    list-style: none; margin: 0; padding: 0;
  }
  .pages {
    position: relative;
  }
  .paper {
    transform-style: preserve-3d;
    position: absolute;
    display: none;
    right: 400px;
  }
  .paper[data-right] {
    position: absolute; left: 400px;
  }
  .page-2-back {
    position: absolute; left: 0;
  }
  .page {
    width: 400px; float: left;
  }
  img {
    width: 100%;
  }
  .content {
    width: 800px; margin: 20px auto 0;
  }
  .page-1-back,
  .page-2-back {
    transform: scale(-1, 1);
  }
  .page-1,
  .page-2 {
    z-index: 1;
    transform: translateZ(1px);
    position: absolute;
    left: 0;
    top: 0;
  }
  @keyframes flip-to-left {
    from {
      transform: perspective(1000px) rotateY(0);;
    }
    to {
      transform: perspective(1000px) rotateY(-180deg);
    }
  }
  .paper[data-right] {
    transform-origin: left center;
    animation: flip-to-left 2s ease-in-out forwards;
  }
  .paper[data-left],
  .paper[data-right] {
    display: block;
    z-index: 1;
  }
  .paper[data-left] {
    right: auto;
    left: 0;
  }
  .paper[data-right] + .paper {
    display: block;
  }
</style>
