<!-- 推荐默认用 const + 箭头函数，
 除非需要this才用 function。
 而组合式API+setup是不会用到this的 -->

<script setup>

  import TaskList from './components/TaskList.vue';
  import TaskInput from './components/TaskInput.vue';
  import TaskHeader from './components/TaskHeader.vue';
 
</script>

<template>
  <TaskInput/>
  <p>todoList</p>

  <TaskHeader/>

  <TaskList />

</template>

<style scoped>

</style>
