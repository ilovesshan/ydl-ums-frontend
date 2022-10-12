<template>
  <div id="index">
    <div class="common-layout">
      <el-container>
        <IndexAside />
        <el-container direction="vertical">
          <IndexHeader />
          <el-main> 
            <router-view></router-view>
          </el-main>
          <IndexFooter />
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from "vuex"

import IndexHeader from "@/components/layout/header.vue"
import IndexAside from "@/components/layout/aside.vue"
import IndexFooter from "@/components/layout/footer.vue"

export default defineComponent({
  components: {
    IndexHeader, IndexAside, IndexFooter,
  },
  setup() {
    const store = useStore();

    const username = computed(() => store.getters["auth/username"]);
    return {
      username,
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

    .el-main {
      width: 100%;
      background-color: #ffffff;
    }

    .el-main {
      margin: 10px 0;
    }
  }
}
</style>