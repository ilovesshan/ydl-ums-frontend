<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <h1>{{ isLogin }}</h1>
    <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';
import { useStore } from "vuex"
export default defineComponent({
  name: 'HelloWorld',

  setup(){
    const store = useStore();

    const message = computed(() => store.state.user.user.username)
    const isLogin = computed(() => store.state.user.user.isLogin)

    return {
      message, isLogin
    }
  },

});
</script>

<style scoped lang="less">

</style>
