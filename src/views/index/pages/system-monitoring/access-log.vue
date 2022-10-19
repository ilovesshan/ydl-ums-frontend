<template>
  <div id="access-log">
    <!-- 表格数据 -->
    <el-table :data="accessList" stripe style="width: 100%">
      <el-table-column prop="loginId" label="登录ID" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="browser" label="浏览器类型" />
      <el-table-column prop="systemOs" label="操作系统" />
      <el-table-column prop="loginLocaltion" label="登录地址" />
      <el-table-column prop="loginTime" label="登录时间" />
    </el-table>

    <!-- 分页对象 -->
    <div class="pagination-container">
      <el-pagination v-model:currentPage="selectConditions.pageNum" v-model:page-size="selectConditions.pageSize"
        :page-sizes="[10, 30, 50, 100]" :background="true" layout="total, sizes, prev, pager, next, jumper"
        :total="accessTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, computed } from 'vue';

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
        username: "",
        loginLocaltion: "",
        // loginTime: "",
      },
    });

    onMounted(() => store.dispatch("systemMonitoring/selectAccessList", selectConditions));

    const accessList = computed(() => store.getters["systemMonitoring/accessList"]);
    const accessTotal = computed(() => store.getters["systemMonitoring/accessTotal"]);


    // 分页信息改变
    const handleSizeChange = (val: number) => store.dispatch("systemMonitoring/selectAccessList", selectConditions);
    const handleCurrentChange = (val: number) => store.dispatch("systemMonitoring/selectAccessList", selectConditions);


    return {
      accessList, accessTotal, selectConditions,
      handleSizeChange, handleCurrentChange
    }
  }

});
</script>

<style scoped lang="less">
#access-log {
  width: 100%;
  height: 100%;

  .pagination-container {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
