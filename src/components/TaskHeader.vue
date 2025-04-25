<!-- TaskHeader.vue -->
<!-- 功能区，可筛选任务、清除已完成任务、统计任务数量 -->

<!-- ----------------组件通信版 --------------------------- -->

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

<!-- ----------------组件通信版 --------------------------- -->

<script setup>
  import { computed } from 'vue'
  import { useTodoStore } from '@/stores/todo'

  const todoStore=useTodoStore();
  //const tasks=computed(()=>todoStore.filteredTasks);
  //虽然更麻烦但是更好维护，包一层computed比较清晰
  const allLength=computed(()=>todoStore.allLength);
  const doneLength=computed(()=>todoStore.doneLength);
 
</script>

<template>

  


  <div class="header">
    <!-- :class="{ className: 条件 }"
    如果条件为 true，就添加 className 这个类名到该元素上。-->
    <span 
    @click="todoStore.filterTasks('all')"
    :class="{ active: todoStore.filterStatus === 'all' }"
    >全部</span>
    <span 
    @click="todoStore.filterTasks('todo')"
    :class="{ active: todoStore.filterStatus === 'todo' }"
    >未完成</span>
    <span 
    @click="todoStore.filterTasks('done')"
    :class="{ active: todoStore.filterStatus === 'done' }"
    >已完成</span>
  </div>

  <!-- 模版直接这样使用也可以
  <p>共{{ todoStore.allLength }}项，已完成{{ todoStore.doneLength }}项</p> -->
  <p>共{{ allLength }}项，已完成{{ doneLength }}项</p>

  <div class="allchecked">
    <input type="checkbox" 
    v-model="todoStore.isAllChecked">
    <span>一键标记</span>
  </div>


  <button 
  class="clearAll"
  @click="todoStore.removeDoneTasks();"
  >清除所有已完成任务</button>

</template>

<style scoped>
  
  p{
    position: absolute;
    right: 0px;
    top: 80px;
    margin: 5px;
    width: 150px;
    box-sizing: border-box;
    padding-left: 10px;
    box-shadow: 2px 1px #e4e4e4;
  }
  .header{
    position: relative;
    border: 1px solid c3c2c2;
    background-color: #c3c2c2;
    box-shadow: 2px 3px 2px gainsboro;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
    margin-bottom: 10px;
    margin-top: 35px;
  }
  .header span{
    /* flex: 1; */
    width: 70px;
    text-align: center;
    box-sizing: border-box;
    padding: 5px;
    /* border: 1px solid black; */
    border-radius: 10px;
    color: #000000;
  }
  .header span:hover{
    background-color: #4747478c;
    color: white;
    cursor: pointer;
  }
  .header span:active{
    outline: solid rgb(101, 101, 101);
  }
  .header span.active {
    background-color: #737373;
    color: white;
    font-weight: bold;
    border: 1px solid #00000066;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  button{
    width: 200px;
    height: 35px;
    color: white;
    position: absolute;
    right: 10px;
    top: 125px;
    background-color: #acacac;
    border-radius: 20px;
    box-sizing: border-box;
    box-shadow: 2px 3px 2px rgba(192, 190, 190, 0.338);
  }
  button:hover{
    cursor: pointer;
    background-color: #b0aeae;
    box-shadow: 2px 3px 2px rgba(192, 190, 190, 0.747);
  }

  @media (max-width: 480px){
    .header{
      margin: 10px;
      gap: 7px;
    }
    .clearAll{
      font-size: 12px;
      box-sizing: border-box;
      padding: 3px;
      border-radius: 10px;
      width: 130px;
      height: 25px;
      top: 155px;
    }
    p{
      font-size: 12px;
      width: 130px;
      top: 120px;
    }
    
  }

</style>