

<template>
  <el-footer>
    <p class="footer-text">USM项目- 前端技术栈：vue3+ts+axios，后端技术栈： ssm+mysql+redis</p>
  </el-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "",
});
</script>

<style lang="less" scoped>
.el-footer {
  background-color: #ffffff;
  color: #3a3737;
  text-align: center;
  line-height: 60px;

  .footer-text {
    font-size: 14px;
  }
}
</style>