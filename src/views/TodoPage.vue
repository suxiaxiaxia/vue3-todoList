<script setup>

  import TaskInput from '@/components/TaskInput.vue';
  import TaskHeader from '@/components/TaskHeader.vue';
  import TaskList from '@/components/TaskList.vue';
  
</script>

<template>
  <div class="todoPage">
    <TaskInput />
    <TaskHeader />
    <!-- <TaskInput /> -->
    <TaskList />
  </div>
</template>

<style scoped>
  .todoPage{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
