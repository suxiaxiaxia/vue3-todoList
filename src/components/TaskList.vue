<!-- TaskList.vue -->
<!-- 渲染任务列表 -->

<script setup>
  import TaskItem from './TaskItem.vue';
  
  //props是只读操作
  //不推荐子组件直接删数据再传回父，破坏数据流动方向、可维护性差
  const {tasks}=defineProps({
    tasks:Array
  })

  const emits=defineEmits([
    'sendRemove',
    'sendDone',
    'sendIsEditTrue',
    'sendIsEditFalse'
  ])

  const sendRemove=(id)=>{
    emits('sendRemove',id)
  }

  const sendDone=(task)=>{
    emits('sendDone',task)
  }

  const sendIsEditTrue=(task)=>{
    emits('sendIsEditTrue',task)
  }

  const sendIsEditFalse=(task)=>{
    emits('sendIsEditFalse',task)
  }
  
</script>

<template>
  <!-- 拿到任务列表tasks后，需要渲染所有任务 -->
  <!-- 把单个任务传给TaskItem -->
  <TaskItem 
  v-for="task in tasks" 
  :key="task.id"
  :task="task"
  @send-remove-task="sendRemove"
  @send-done-change="sendDone"
  @send-edit-istrue="sendIsEditTrue"
  @send-edit-isfalse="sendIsEditFalse"/>
  
</template>

<style scoped>
  
</style>