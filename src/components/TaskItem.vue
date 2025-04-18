<!-- TaskItem.vue -->
<!-- 单个任务处理：删除任务、标记已完成任务、双击编辑任务 -->

<!-- 双击编辑任务逻辑：用v-if和v-else切换<p>和<input>，
tasks还需要一个属性isEdit记录是否处于编辑状态，
又因为是双击触发编辑，所以p监听dblclick事件，触发isEdit=ture,
回车或失焦保存，所以input监听keyup和blur事件,触发isEdit=false -->


<script setup>
  import { ref } from 'vue';

  //传来单个任务
  const {task}=defineProps({
    task:Object
  })

  //emits告诉父组件要进行什么操作
  const emits=defineEmits([
    'sendRemoveTask',//告诉父组件删除任务列表的某个
    'sendDoneChange',
    'sendEditIstrue',
    'sendEditIsfalse'
  ])
  //sendRemoveTask事件
  //JS函数参数必须是合法的“变量名”，不能是 对象.属性
  const sendRemoveTask=(task)=>{
    //传给父组件一个id
    emits('sendRemoveTask',task.id)
  }
  //snedDoneChange事件 告诉父组件done状态改变了
  const sendDoneChange=(task)=>{
    //console.log(task.done);
    emits('sendDoneChange',task)  //整个task对象传  
  }
  //sendEditIstrue事件
  const sendEditIstrue=(task)=>{
    console.log('111111');
    
    emits('sendEditIstrue',task)
  }
  //sendEditIsfalse事件
  const sendEditIsfalse=(task)=>{
    emits('sendEditIsfalse',task)
  }

</script>

<template>
  <!-- 先不渲染，这是单个任务 -->

  <div class="taskItem">
    <input type="checkbox" 
    v-model.lazy="task.done"
    @change="sendDoneChange(task)">

    <!-- 双击变成可编辑模式 -->
    <!-- change是修改后失焦事件，blur不稳定，@change="sendEditIsfalse(task)" -->
    <!-- 可以加自动聚焦功能 ref=-->
    <input type="text" 
    v-model.lazy="task.text"
    v-if="task.isEdit"
    @keyup.enter="sendEditIsfalse(task)">
    <p @dblclick="sendEditIstrue(task)" v-else>{{ task.text }}</p>
    

    <!-- 点击删除触发sendRemoveTask事件 -->
    <button @click="sendRemoveTask(task)">删除</button>
  </div>

</template>

<style scoped>
  .taskItem{
    display: flex;
  }
</style>