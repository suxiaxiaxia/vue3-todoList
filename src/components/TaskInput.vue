<!-- TaskInput.vue -->
<!-- 添加待办事项 -->

<script setup>
  import { ref } from 'vue';

  const newTask=ref('');//新任务
  const emits=defineEmits([
    'sendAddTask'
  ])
  const sendAddTask=(newTask)=>{
    emits('sendAddTask',newTask)
  }
</script>

<template>
  <input type="text" placeholder="输入待办事项" v-model.lazy="newTask">
  <!-- 点击添加按钮，把新任务传递给父组件 -->
  <button @click="sendAddTask(newTask)">添加</button>

</template>

<style scoped>

</style>