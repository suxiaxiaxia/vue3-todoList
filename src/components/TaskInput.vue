<!-- TaskInput.vue -->
<!-- 添加待办事项 -->

<!-- 使用elementPlus表单 -->
<!-- 表单校验，如果输入内容不为空，emits('sendAddTask',输入内容) -->
<!-- 本来想用rules写传统校验，但是好像不太符合待办事项添加任务的逻辑；
如果输入框是空时提交，提示输入框不能为空，但是应该只提示几秒就消失，
而不是常驻的红框+红字 -->

<script setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useTodoStore } from '@/stores/todo';

  const todoStore=useTodoStore();
  const newTask=ref('');//新任务
 
  //输入框校验
  const isValid=()=>{
    if(!newTask.value.trim()){
      ElMessage.error('待办事项不能为空~');
      return;
    }else{
      todoStore.addTask(newTask.value);//传字符串
      newTask.value='';

      console.log(todoStore.allLength);
      console.log(todoStore.doneLength);      
      
    }
  }
  
  
</script>

<template>
  <!-- el-form-item包住每一个需要校验的输入项
  按钮本身不需要校验，但通常也把它放在 el-form-item 里，
  主要是为了样式对齐和表单结构清晰。 -->

  <el-form>
    <el-form-item>
      <el-input type="text" placeholder="输入待办事项" v-model.lazy="newTask"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="isValid">添加</el-button>
    </el-form-item>
    
  </el-form>
  

</template>

<style scoped>

</style>