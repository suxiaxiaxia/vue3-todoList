<!-- TaskItem.vue -->
<!-- 单个任务处理：删除任务、标记已完成任务、双击编辑任务 -->

<!-- 双击编辑任务逻辑：用v-if和v-else切换<p>和<input>，
tasks还需要一个属性isEdit记录是否处于编辑状态，
又因为是双击触发编辑，所以p监听dblclick事件，触发isEdit=ture,
回车或失焦保存，所以input监听keyup和blur事件,触发isEdit=false -->

<!-- 关于stores:
传整个task对象好像更方便、更清晰，为什么还要推荐只传id？
props是浅响应,当父组件修改task对象的某个属性时，子组件确实能响应。
但如果任务数据在store被更新了，而传入的是旧的task对象副本（比如浅拷贝、数组更新等场景），
子组件不会第一时间感知。而用 taskId + computed(() => store.todos.find(...))，
每次都从store拿最新的任务，永远是最新的响应式数据。 -->
<script setup>
  import { useTodoStore } from '@/stores/todo';
  import { computed, nextTick, ref } from 'vue';
  import { watch } from 'vue';

  const todoStore=useTodoStore();

  //传来单个任务的id
  const {taskId}=defineProps({
    taskId:Number
  })
  //console.log(taskId);
  
  //计算对应的任务，方便修改task.done和task.isEdit
  //不要todoStore.filteredTasks.find，因为有可能找不到
  //然后在filteredTasks空时触发某事件浏览器会报错
  const task=computed(()=>{
    return todoStore.tasks.find(item=>item.id===taskId)
  })
  //console.log(task.value);
  
  //自动聚焦
  //监听对象是函数的时候vue才会去追踪，不能写成task.value.isEdit
  const inputRef=ref(null);
  watch(
    ()=>task.value&&task.value.isEdit,//防止task.value是undifined
    async(newVal)=>{
      if(newVal){//如果正在编辑
        await nextTick();//先等待dom元素渲染完成
        //可选链，虽然肯定会有inputRef而且还有nextTick
        //但是不能100%保证inputRef.value一定不为null
        inputRef.value?.focus();
      }
    }
  )
  

</script>

<template>
  <!-- 先不渲染，这是单个任务 -->
  <!-- 没有任务的话就不显示 -->

  <!-- 如果判断v-if="task"，task是一个computedRef，永远为true -->
  <!-- 已经显式用了.value，Vue会认为task是个普通对象，不会再自动调用.value -->
  <div class="taskItem" v-if="task">
    <input type="checkbox" 
    v-model.lazy="task.done"
    @change="todoStore.changeTaskDone(task)">
 
    <!-- 双击变成可编辑模式 -->
    <!-- change是修改后失焦事件，blur不稳定，@change="sendEditIsfalse(task)" -->
    <!-- 可以加自动聚焦功能 ref=-->
    <input type="text" 
    v-model.lazy="task.text"
    v-if="task.isEdit"
    ref="inputRef"
    @keyup.enter="todoStore.handleEditFalse(task)"
    @blur="todoStore.handleEditFalse(task)">

    <p 
    @dblclick="todoStore.handleEditTrue(task)" 
    v-else>{{ task.text }}</p>
    

    <!-- 点击删除触发sendRemoveTask事件 -->
    <button @click="todoStore.deleteTask(taskId)">删除</button>
  </div>

</template>

<style scoped>
  .taskItem{
    display: flex;
  }
</style>