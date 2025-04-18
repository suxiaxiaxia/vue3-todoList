//useLocalTasks.js
//本地存储

//原逻辑：在App.vue中判断本地存储是否有'tasks'，
//如果没有存储则新建一个tasks=ref([])，然后放进本地存储里；
//如果有存储就导入tasks=JSON.parse(localStorage.getItem('tasks')).
//之后每进行一次任务的增删改都要在本地存储保存。

//优化：使用watchEffect自动同步到localStorage，
//并封装成 composable 函数

import { ref, watchEffect } from "vue";

export function useLocalTasks() {
  //初始化
  const tasks = ref([]);
  const localData = JSON.parse(localStorage.getItem('tasks'));
  if (localData != null) {
    //如果本地有数据，更新tasks
    tasks.value = localData;
  }

  //watchEffect()可以自动追踪所有能访问到的响应式属性
  watchEffect(() => {
    //自动追踪tasks
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  })

  return tasks;
}

