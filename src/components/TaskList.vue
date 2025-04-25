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
  <div class="taskList">
    <TaskItem 
    v-for="task in tasks" 
    :key="task.id"
    :taskId="task.id"/>
  </div>
  
</template>

<style scoped>
  .taskList{
    background-color: rgba(220, 220, 220, 0.304);
    flex: 1;
    box-sizing: border-box;
    margin: 20px;
    padding-top: 10px;
    padding-left: 50px;
    border: 1px solid rgba(203, 203, 203, 0.564);
    border-radius: 5px;
    box-shadow: 2px 1px 3px rgba(203, 203, 203, 0.564) inset;
    display: flex;
    flex-direction: column;
    
    /* align-items:baseline; */
    gap: 5px;

  }

  @media (max-width: 480px){
    .taskList{
      margin: 0;
      padding: 0;
      padding-top: 10px;
      padding-left: 10px;
    }
  }
</style>