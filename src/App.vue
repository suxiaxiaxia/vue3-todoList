<!-- 推荐默认用 const + 箭头函数，
 除非需要this才用 function。
 而组合式API+setup是不会用到this的 -->

<script setup>
  import { computed, ref } from 'vue';
  import TaskList from './components/TaskList.vue';
  import TaskInput from './components/TaskInput.vue';
  import TaskHeader from './components/TaskHeader.vue';
  import { useLocalTasks } from './components/useLocalTasks';
  
  const tasks=useLocalTasks();//存放所有任务
  const filterStatus=ref('all');//过滤器状态，默认全部


  //筛选任务
  const filteredTasks=computed(()=>{
    //这里返回的是conputedRef
    //Vue会自动解包computed/ref的.value值,传给子组件的是数组本身（Array）
    //如果返回tasks（没加 .value），
    //filteredTasks.value 就是一个 ref 对象，而不是数组。
    //最终访问的是 ref(ref(...))，Vue是不会自动解两层的，导致渲染出错。
    if(filterStatus.value==='all'){
      return tasks.value;
    }else if(filterStatus.value==='done'){
      return tasks.value.filter(item=>item.done===true);
    }else if(filterStatus.value==='todo'){
      return tasks.value.filter(item=>item.done===false);
    }
  })

  //任务数量
  //allLength=tasks.value.length;doneLength=tasks.value.filter(item=>item.done===true).length;
  //这个操作会把ref类型替换为普通的number，此时allLength就不是响应式了，后续也不会触发更新。
  //如果值是依赖其他响应式数据计算得来的,用computed
  const allLength=computed(()=>tasks.value.length);
  const doneLength=computed(()=>tasks.value.filter(item=>item.done===true).length);
  
  //子组件触发sendAddTask事件后，执行addTask事件
  //添加newTask到任务列表tasks
  const addTask=(newTask)=>{
    if(newTask.trim()){//传进来的newTask是个字符串
      console.log(tasks.value);
      console.log(typeof tasks.value);      
      //如果新任务不为空白，把新任务添加到任务列表
      tasks.value.push({
        id:Date.now(),//时间戳，生成唯一id
        text:newTask,
        done:false,//一开始是没完成的
        isEdit:false//一开始未编辑
      })
      console.log(allLength.value);
      console.log(doneLength.value);
      
      
    }
  }

  //子组件触发sendRemoveTask事件后，执行removeTask事件
  //删除id任务
  const removeTask=(id)=>{
    console.log(id);
    //查找tasks里所有任务的id===id的任务的索引，没有查找到返回-1
    const removeTaskIndex=tasks.value.findIndex(item=>item.id===id);
    console.log(removeTaskIndex);
    if(removeTaskIndex!=-1){//查找到了就删掉
      tasks.value.splice(removeTaskIndex,1);
    }  
    console.log(tasks.value);
    
  }
  
  //checkbox状态
  const changeTaskDone=(task)=>{
    //更新done
    const doneChangeIndex=tasks.value.findIndex(item=>item.id===task.id);
    if(doneChangeIndex!=-1){
      tasks.value[doneChangeIndex].done=task.done;
    }
    console.log(tasks.value);   
  }

  //是否编辑
  const handleEditTrue=(task)=>{
    const isEditChangeIndex=tasks.value.findIndex(item=>item.id===task.id);
    if(isEditChangeIndex!=-1){
      tasks.value[isEditChangeIndex].isEdit=true;
    }
    console.log(tasks.value);  
  }
  const handleEditFalse=(task)=>{
    const isEditChangeIndex=tasks.value.findIndex(item=>item.id===task.id);
    if(isEditChangeIndex!=-1){
      tasks.value[isEditChangeIndex].isEdit=false;
    }
    console.log(tasks.value);
  }

  //更新filterStatus
  const filterTasks=(status)=>{
    filterStatus.value=status;
    console.log('11111111');   
  }

  //清除已完成任务，即更新tasks为未完成的任务
  const removeDoneTasks=()=>{
    tasks.value=tasks.value.filter(item=>item.done===false);
    console.log(typeof tasks.value);
    console.log(tasks.value);   
  }

  //一键标记
  //如果勾选复选框触发set，参数是现在复选框的状态；tasks.value改变触发get
  //当数组为空时every会返回true，为了避免空列表时复选框被勾选要加length>0 
  //如果只给子组件传isAllChecked，父传子成功子传父不行，不能双向绑定
  //get函数没有return，所以默认返回 undefined;所以最简洁的写法是去掉大括号
  //set不需要return
  const isAllChecked=computed({
    get:()=>tasks.value.length>0&&tasks.value.every(item=>item.done===true),
    set:(newStatus)=>{
      tasks.value.forEach(item=>item.done=newStatus);
    }
  })
</script>

<template>

  <!-- 监听子组件是否触发sendAddTask事件 -->
  <TaskInput
  @send-add-task="addTask"/>
  <p>todoList</p>

  <!-- 双向数据绑定：v-model:isAllChecked="isAllChecked"相当于
  :is-all-checked="isAllChecked"
  @update:is-all-checked="checked=>isAllChecked=checked" -->
  <TaskHeader
  :tasks="filteredTasks"
  :allLength="allLength"
  :doneLength="doneLength"
  v-model:isAllChecked="isAllChecked"
  @send-filter-tasks="filterTasks"
  @send-remove-done-tasks="removeDoneTasks"/>

  <!-- 筛选过后的任务filteredTasks传递给子组件TaskList -->
  <!-- 监听子组件是否触发sendRemove事件 -->
  <TaskList 
  :tasks="filteredTasks"
  @send-remove="removeTask"
  @send-done="changeTaskDone"
  @send-isEdit-true="handleEditTrue"
  @send-isEdit-false="handleEditFalse"/>

</template>

<style scoped>

</style>
