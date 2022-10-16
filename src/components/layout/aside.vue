

<template>
  <el-aside width="200px">
    <el-menu router unique-opened background-color="#304156" :default-active="currentPath" text-color="#bfcbd9"
      @open="handleOpen" @close="handleClose">
      <el-menu-item v-permission=" '/home' " index="/home">
        <el-icon>
          <Orange />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu v-permission=" '/system-management' "  index="/system-management">
        <template #title>
          <el-icon>
            <Setting />
          </el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item  v-permission=" '/system-management/user-management' "  index="/system-management/user-management">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>用户管理</span>
          </template>
        </el-menu-item>
        <el-menu-item  v-permission=" '/system-management/role-management' "  index="/system-management/role-management">
          <template #title  v-permission=" '/system-management' " >
            <el-icon>
              <TurnOff />
            </el-icon>
            <span>角色管理</span>
          </template>
        </el-menu-item>
        <el-menu-item v-permission=" '/system-management/menu-management' "  index="/system-management/menu-management">
          <template #title>
            <el-icon>
              <Menu />
            </el-icon>
            <span>菜单管理</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu v-permission=" '/system-monitoring' " index="/system-monitoring">
        <template #title>
          <el-icon>
            <Monitor />
          </el-icon>
          <span>系统监控</span>
        </template>
        <el-menu-item  v-permission=" '/system-monitoring/access-log' "  index="/system-monitoring/access-log">
          <template #title>
            <el-icon>
              <ChromeFilled />
            </el-icon>
            <span>访问日志</span>
          </template>
        </el-menu-item>
        <el-menu-item  v-permission=" '/system-monitoring/online-user' "  index="/system-monitoring/online-user">
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
import { defineComponent,ref, watch } from 'vue';

import {
  Orange, Setting, UserFilled, TurnOff, Monitor, ChromeFilled, Connection, Menu
} from '@element-plus/icons-vue'

import { useRoute } from "vue-router"


export default defineComponent({
  name: "",
  components: {
    Orange, Setting, UserFilled, TurnOff, Monitor, ChromeFilled, Connection, Menu
  },
  setup() {
    const route = useRoute()
    const currentPath = ref("");

    watch(()=> route.fullPath,(newVal)=>{
      currentPath.value = newVal;
    },{ immediate: true})

    const handleOpen = (key: string, keyPath: string[]) => {
    }

    const handleClose = (key: string, keyPath: string[]) => {
    }

    return {
      currentPath,
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