<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

接受当前变化          覆盖掉旧的
接受即将到来的变更    保留旧版本的代码
接受两个更改           保留双方的代码


<style lang="less">

  *{
    margin: 0;
    padding: 0;
  }
</style>
