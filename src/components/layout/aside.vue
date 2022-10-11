

<template>
  <el-aside width="200px">
    <el-menu unique-opened background-color="#304156" default-active="1" text-color="#bfcbd9" @open="handleOpen"
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  Orange, Setting, UserFilled, TurnOff, Monitor, ChromeFilled, Connection
} from '@element-plus/icons-vue'

export default defineComponent({
  name: "",
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
});
</script>

<style lang="less" scoped>
.el-aside,
.el-menu {
  background-color: #304156;

  .el-sub-menu,
  .el-menu-item {
    width: 200px;
  }

  ::v-deep .is-active {
    width: 200px;
  }

  ::v-deep .is-opened .el-menu {
    background-color: #1f2d3d;
  }
}
</style>