<!-- TaskHeader.vue -->
<!-- 功能区，可筛选任务、清除已完成任务、统计任务数量 -->

<!-- 筛选功能的逻辑，在App.vue中创建两个ref数组tasksHaveDone和tasksWillDo，
通过tasks.value.done把已完成和未完成放进这两个数组里，
再设置变量用在TaskList.vue里，v-if="A"时把tasks里的单个任务传给TaskItem，
v-if="B"时把tasksHaveDone里的单个任务传给TaskItem，
v-if="C"时把tasksWillDo里的单个任务传给TaskItem;
监听TaskHeader.vue里的span 

缺点：
数据重复tasksHaveDone和tasksWillDo是tasks的“派生”，却单独维护
每次任务变化，都要重新分类更新两个数组
v-if 很多，容易出 bug，也不易维护

优化：用一个 filterStatus来控制显示的类别（全部、未完成、已完成），然后用 computed 计算要展示的列表
优点：
更干净：只传一个 filteredTasks；性能好：用computed计算，不重复存储
更易扩展：以后加“优先级”“搜索”等功能很容易
逻辑集中：App.vue 只负责状态和数据控制，展示留给子组件

为什么用computed不用方法？
computed适合依赖响应式数据的“派生状态”,根据依赖值缓存结果
methods适合触发行为（比如点击按钮后做事）-->

<!-- 清除已完成任务逻辑：在TaskHeader.vue上新增一个按钮，
点击时触发sendRemoveDoneTasks事件,传递给父组件，
父组件收到后执行removeDoneTasks，使用filter函数筛选出已完成事件，
返回筛选过后的数组，然后修改tasks -->

<!-- 一键标记逻辑：复选框v-model="isAllChecked"，
说明isAllChecked=true时全选，点击复选框时，isAllChecked.value会改变，
会触发computed的set，改变全部tasks.done；
tasks.done状态有变时，触发get，判断要不要勾选复选框-->

<script setup>
  import { computed } from 'vue'

  const {tasks,allLength,doneLength,isAllChecked}=defineProps({
    tasks:Array,
    allLength:Number,
    doneLength:Number,
    isAllChecked:Boolean
  })

  const emits=defineEmits([
    'sendFilterTasks',
    'sendRemoveDoneTasks',
    'update:isAllChecked'//实现v-model双向绑定
  ])

  const sendFilterTasks=(status)=>{
    emits('sendFilterTasks',status)
  }

  const sendRemoveDoneTasks=()=>{
    emits('sendRemoveDoneTasks')
  }

  const sendCheckedChange=(e)=>{
    console.log(e.target.checked);
    
    emits('update:isAllChecked',e.target.checked)
  }

 
</script>

<template>
  <div class="taskHeader">
    <span @click="sendFilterTasks('all')">全部</span>
    <span @click="sendFilterTasks('todo')">未完成</span>
    <span @click="sendFilterTasks('done')">已完成</span>
  </div>
  <p>共{{ allLength }}项，已完成{{ doneLength }}项</p>
  <button @click="sendRemoveDoneTasks">清除已完成任务</button>
  <input type="checkbox" 
  :checked="isAllChecked"
  @change="sendCheckedChange">一键标记
</template>

<style scoped>
  .taskHeader{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  span{
    flex: 1;
  }
</style>