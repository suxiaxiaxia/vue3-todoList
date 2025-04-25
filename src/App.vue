<!-- 推荐默认用 const + 箭头函数，
 除非需要this才用 function。
 而组合式API+setup是不会用到this的 -->

 <template>
  <div>
    <nav>
      <router-link to="/">首页</router-link> |
      <router-link to="/todos">待办事项</router-link>
    </nav>
    <router-view /> <!-- 动态加载页面组件 -->
  </div>
</template>
