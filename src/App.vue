<template>
  <router-view></router-view>
</template>

<script lang="ts">

import { useStore } from "vuex";

import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    const store = useStore();
    // window.onbeforeunload = function (event: any) {
    //   if (!(event.clientX > document.body.clientWidth && event.clientY < 0 || event.altKey)) {
    //     store.dispatch("auth/logoutHandler");
    //     setTimeout(() => { }, 1000);
    //   } else {
    //     // alert("你正在刷新页面");
    //   }
    // }
    return {}
  }
})
</script>

<style scoped>

</style>
