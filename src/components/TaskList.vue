<!-- TaskList.vue -->
<!-- 渲染任务列表 -->

<script setup>
  import { useTodoStore } from '@/stores/todo';
  import TaskItem from './TaskItem.vue';
  import { computed } from 'vue';
  
  const todoStore=useTodoStore();
  const tasks=computed(()=>todoStore.filteredTasks);
  console.log(tasks.value);
   
</script>

<template>
  <!-- 拿到任务列表tasks后，需要渲染所有任务 -->
  <!-- 把单个任务传给TaskItem -->
  <TaskItem 
  v-for="task in tasks" 
  :key="task.id"
  :taskId="task.id"/>
  
</template>

<style scoped>
  
</style>