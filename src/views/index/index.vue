<template>
  <div id="index">
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1">
              <el-icon>
                <HomeFilled />
              </el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="1-4">
              <template #title> <span>用户管理</span> </template>
              <el-menu-item index="1-4-1">用户管理</el-menu-item>
              <el-menu-item index="1-4-2">授权管理</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="6-4">
              <template #title><span>系统日志</span></template>
              <el-menu-item index="6-4-1">错误日志</el-menu-item>
              <el-menu-item index="6-4-2">访问日志</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            头部信息
          </el-header>
          <el-main>
            Main
          </el-main>
          <el-footer>
            <p class="footer-text">USM项目- 前端技术栈：vue3+ts+axios，后端技术栈： ssm+mysql+redis</p>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  HomeFilled
} from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    HomeFilled
  },
  setup() {

    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen, handleClose, HomeFilled
    }
  }
})
</script>

<style scoped lang="less">
#index {
  width: 100%;
  height: 100vh;
  background-color: #f1f3f4;

  .common-layout,
  .el-container {
    height: 100%;

    .el-header,
    .el-main {
      width: 100%;
      background-color: #ffffff;
    }

    .el-main {
      margin: 10px 0;
    }

    .el-aside {
      .el-menu {
        background-color: #d3dce6;

      }
    }

    .el-footer {
      background-color: #ffffff;
      color: #3a3737;
      text-align: center;
      line-height: 60px;

      .footer-text {
        font-size: 14px;
      }
    }
  }
}
</style>