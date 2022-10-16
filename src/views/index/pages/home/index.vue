<template>
  <div>
    <div class="home">
      <h2 @click="getUserInfo">首页</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { selectById } from "@/service/auth.user"

export default defineComponent({
  setup() {
    const getUserInfo = () => {
      selectById(1).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
    return {
      getUserInfo,
    }
  }
})
</script>

<style scoped lang="less">

</style>