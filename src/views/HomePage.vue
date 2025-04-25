<template>
  <div class="home">
    <h1>欢迎来到todoList！</h1>
    <p>点击上方导航跳转到「待办事项」页面</p>
  </div>
</template>

<style scoped>
  .home{
    flex: 1;
    /* background-color: gainsboro; */
    border: 1px solid gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 35px;
  }
  h1{
    font-size: 30px;
  }
</style>
