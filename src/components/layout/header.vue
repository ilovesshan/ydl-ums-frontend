<template>
  <el-header>
    <el-button @click="logoutHandler" type="success">退出登录</el-button>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from "vue-router"

export default defineComponent({
  name: "",
  setup(){
    const router = useRouter();
    const logoutHandler = ()=>{
      router.push("/login");
    }
    return {
      logoutHandler
    }
  }
});
</script>

<style lang="less" scoped>
.el-header {
  width: 100%;
  text-align: right;
  line-height: 60px;
  background-color: #ffffff;
}
</style>