<template>
  <div class="access-log">
    <h2>访问日志</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';


import { useStore } from "vuex"
import { ISelectConditions } from './types';

export default defineComponent({
  name: "access-log",

  setup() {
    const store = useStore()

    const selectConditions = reactive<ISelectConditions>({
      pageSize: 10,
      pageNum: 1,
      condition: {
        username:"ilovesshan",
        loginLocaltion:"",
        loginTime:"",
      },
    })

    onMounted(() => store.dispatch("systemMonitoring/selectAccessList", selectConditions));


    return {

    }
  }

});
</script>

<style scoped lang="less">

</style>
