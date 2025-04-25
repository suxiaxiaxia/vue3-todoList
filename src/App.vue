<!-- 推荐默认用 const + 箭头函数，
 除非需要this才用 function。
 而组合式API+setup是不会用到this的 -->

 <template>
  <div class="views">
    <nav>
      <router-link to="/">首页</router-link> |
      <router-link to="/todos">待办事项</router-link>
      <hr>
    </nav>
    
    <router-view /> <!-- 动态加载页面组件 -->
  </div>
</template>

<style scoped>
  .views{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  nav{
    margin-bottom: 20px;
  }
  hr{
    margin-top: 10px;
  }
</style> 

<style>
  .el-input__wrapper.is-focus {
  box-shadow: 0 0 0 2px #9d9d9d inset; /* 改成你想要的聚焦颜色 */
  border-color: #9f9f9f;
}
</style>
