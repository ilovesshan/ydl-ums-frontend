<template>
  <div id="access-log">
    <!-- 查询条件 -->
    <div class="conditions-container">

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="登录地址">
            <el-input v-model="selectConditions.condition.loginLocaltion" placeholder="登录地址" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名称">
            <el-input v-model="selectConditions.condition.username" placeholder="用户名称" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="操作系统">
            <el-input v-model="selectConditions.condition.systemOs" placeholder="操作系统" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="登录时间">
            <el-date-picker format="YYYY-MM-DD" v-model="accessTime" type="daterange" range-separator="到"
              value-format="YYYY-MM-DD hh:mm:ss" @change="datePickerChange" start-placeholder="开始日期"
              end-placeholder="结束日期" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-button @click="selectAccessList" type="primary">搜索 <el-icon class="el-icon--right">
            <Search />
          </el-icon>
        </el-button>
        <el-button @click="resetConditions">重置 <el-icon class="el-icon--right">
            <RefreshRight />
          </el-icon>
        </el-button>
        <el-button type="danger" @click="deleteAccessList" :disabled="selectRows.length==0" plain>删除 <el-icon
            class="el-icon--right">
            <Delete />
          </el-icon>
        </el-button>
        <el-button type="success" @click="exportAccessList" :disabled="selectRows.length==0" plain>导出 <el-icon
            class="el-icon--right">
            <Download />
          </el-icon>
        </el-button>
      </el-row>
    </div>

    <!-- 表格数据 -->
    <el-table :data="accessList" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
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
import { defineComponent, onMounted, reactive, computed, ref } from 'vue';
import { Delete, Download, Search, RefreshRight } from '@element-plus/icons-vue'

import { useStore } from "vuex"
import { ISelectConditions } from './types';

// import { formatDate } from "@/utils/time"


export default defineComponent({
  name: "access-log",

  components: {
    Delete, Download, Search, RefreshRight
  },

  setup() {
    const store = useStore()

    const accessTime = ref("");
    let selectRows = ref<any[]>([]);
    const selectConditions = reactive<ISelectConditions>({
      pageSize: 10,
      pageNum: 1,
      condition: {
        username: "",
        systemOs: "",
        startTime: "",
        endTime: "",
      },
    });

    onMounted(() => store.dispatch("systemMonitoring/selectAccessList", selectConditions));

    const accessList = computed(() => store.getters["systemMonitoring/accessList"]);
    const accessTotal = computed(() => store.getters["systemMonitoring/accessTotal"]);


    // 分页信息改变
    const handleSizeChange = (val: number) => store.dispatch("systemMonitoring/selectAccessList", selectConditions);
    const handleCurrentChange = (val: number) => store.dispatch("systemMonitoring/selectAccessList", selectConditions);

    // 带条件搜索
    const selectAccessList = () => store.dispatch("systemMonitoring/selectAccessList", selectConditions);


    // 处理开始时间和结束时间
    const datePickerChange = (value: any) => {
      selectConditions.condition.startTime = value[0];
      selectConditions.condition.endTime = value[1];
    }

    // 重置搜索条件
    const resetConditions = () => {
      accessTime.value = "";
      selectConditions.condition = {
        username: "",
        systemOs: "",
        startTime: "",
        endTime: "",
      }
    };

    // 表格行选中触发
    const handleSelectionChange = (values: any[]) => selectRows.value = values;

    // 删除访问日志
    const deleteAccessList = () => {
      const ids = selectRows.value.map(row => row.loginId).join(",");
      store.dispatch("systemMonitoring/deleteAccessByIds", ids);
    }

    // 导出访问日志
    const exportAccessList = () => { }


    return {
      accessList, accessTotal, selectConditions, accessTime, selectRows,
      handleSizeChange, handleCurrentChange, selectAccessList, resetConditions, datePickerChange, handleSelectionChange, deleteAccessList, exportAccessList
    }
  }

});
</script>

<style scoped lang="less">
#access-log {
  width: 100%;
  height: 100%;

  .conditions-container {
    margin-bottom: 20px;
  }

  .pagination-container {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
  }

}
</style>
