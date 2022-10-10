<template>
  <div id="index">
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <el-menu unique-opened background-color="#304156" default-active="1" @open="handleOpen" text-color="#bfcbd9"
            @close="handleClose">
            <el-menu-item index="1">
              <el-icon>
                <Orange />
              </el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <Setting />
                </el-icon>
                <span>系统管理</span>
              </template>
              <el-menu-item index="2-1">
                <template #title>
                  <el-icon>
                    <UserFilled />
                  </el-icon>
                  <span>用户管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="2-2">
                <template #title>
                  <el-icon>
                    <TurnOff />
                  </el-icon>
                  <span>角色管理</span>
                </template>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <Monitor />
                </el-icon>
                <span>系统监控</span>
              </template>
              <el-menu-item index="3-1">
                <template #title>
                  <el-icon>
                    <ChromeFilled />
                  </el-icon>
                  <span>访问日志</span>
                </template>
              </el-menu-item>
              <el-menu-item index="3-2">
                <template #title>
                  <el-icon>
                    <Connection />
                  </el-icon>
                  <span>在线用户</span>
                </template>
              </el-menu-item>
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
  Orange, Setting, UserFilled, TurnOff, Monitor, ChromeFilled, Connection
} from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    Orange, Setting, UserFilled, TurnOff, Monitor, ChromeFilled, Connection
  },
  setup() {

    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen, handleClose
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

    .el-header{
      text-align: center;
      line-height: 60px;
    }

    .el-main {
      margin: 10px 0;
    }

    .el-aside,
    .el-menu {
      background-color: #304156;
      .el-sub-menu,
      .el-menu-item {
        width: 200px;
      }

      ::v-deep .is-active{
        width: 200px;
        background-color: #304156;
      }

      ::v-deep .is-opened .el-menu {
        background-color: #1f2d3d;
      }
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
</style>