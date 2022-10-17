<template>
  <el-header>
    <div class="header-left">
      <el-breadcrumb separator="">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in breadCrumbList">
          <i v-if="item.path !== '/'"> {{item.meta.title}}</i>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <svg t="1665575559458" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2540" width="28" height="28">
            <path
              d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512a426.410667 426.410667 0 0 0 291.754667 404.821333c21.333333 3.712 29.312-9.088 29.312-20.309333 0-10.112-0.554667-43.690667-0.554667-79.445333-107.178667 19.754667-134.912-26.112-143.445333-50.133334-4.821333-12.288-25.6-50.133333-43.733333-60.288-14.933333-7.978667-36.266667-27.733333-0.554667-28.245333 33.621333-0.554667 57.6 30.933333 65.621333 43.733333 38.4 64.512 99.754667 46.378667 124.245334 35.2 3.754667-27.733333 14.933333-46.378667 27.221333-57.045333-94.933333-10.666667-194.133333-47.488-194.133333-210.688 0-46.421333 16.512-84.778667 43.733333-114.688-4.266667-10.666667-19.2-54.4 4.266667-113.066667 0 0 35.712-11.178667 117.333333 43.776a395.946667 395.946667 0 0 1 106.666667-14.421333c36.266667 0 72.533333 4.778667 106.666666 14.378667 81.578667-55.466667 117.333333-43.690667 117.333334-43.690667 23.466667 58.666667 8.533333 102.4 4.266666 113.066667 27.178667 29.866667 43.733333 67.712 43.733334 114.645333 0 163.754667-99.712 200.021333-194.645334 210.688 15.445333 13.312 28.8 38.912 28.8 78.933333 0 57.045333-0.554667 102.912-0.554666 117.333334 0 11.178667 8.021333 24.490667 29.354666 20.224A427.349333 427.349333 0 0 0 938.666667 512c0-235.733333-190.933333-426.666667-426.666667-426.666667z"
              fill="#000000" p-id="2541"></path>
          </svg>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-link href="https://github.com/" target="_blank">前端源码</el-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-link href="https://github.com/" target="_blank">后端源码</el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-tooltip effect="dark" content="文档地址" placement="bottom">
        <svg t="1665576051630" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="5099" width="26" height="26">
          <path
            d="M512 68.191078c-245.204631 0-443.808922 198.60429-443.808922 443.808922s198.60429 443.808922 443.808922 443.808922 443.808922-198.60429 443.808922-443.808922S757.203608 68.191078 512 68.191078zM556.38079 822.665529l-88.76158 0 0-88.76158 88.76158 0L556.38079 822.665529zM648.02707 478.935953l-39.720653 40.829917c-31.954783 31.953759-51.925626 58.804291-51.925626 125.375475l-88.76158 0 0-22.190395c0-49.040926 19.971867-93.421716 51.925626-125.597533l55.254441-55.919591c15.97688-15.97688 25.963325-38.167275 25.963325-62.577221 0-49.040926-39.720653-88.76158-88.76158-88.76158s-88.76158 39.720653-88.76158 88.76158l-88.76158 0c0-98.081853 79.441307-177.523159 177.523159-177.523159s177.523159 79.441307 177.523159 177.523159C689.523159 417.912112 673.768337 453.194686 648.02707 478.935953z"
            p-id="5100"></path>
        </svg>
      </el-tooltip>


      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar shape="square" :size="35" src="https://avatars.githubusercontent.com/u/63763453?v=4" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="dialogVisible = true">个人中心</el-dropdown-item>
            <el-dropdown-item @click="logoutHandler" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>


    <!-- 用户信息对话框 -->
    <el-dialog v-model="dialogVisible" title="个人中心" width="40%" :before-close="handleClose">
      <el-tabs v-model="tabActiveIndex" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="baseUserInfo">
          <!-- 基本信息 -->
          <el-form ref="userDetailFormRef" :model="userDetailForm.submitData" status-icon :rules="userDetailRules"
            label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userDetailForm.submitData.username" type="text" autocomplete="off" />
            </el-form-item>

            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="userDetailForm.submitData.nickName" type="text" autocomplete="off" />
            </el-form-item>

            <el-form-item label="性别" prop="sex">
              <el-select v-model="userDetailForm.submitData.sex" placeholder="">
                <el-option label="男" value="0" />
                <el-option label="女" value="1" />
              </el-select>
            </el-form-item>

            <el-form-item label="手机号" prop="phonenumber">
              <el-input v-model="userDetailForm.submitData.phonenumber" type="text" autocomplete="off" />
            </el-form-item>

            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="userDetailForm.submitData.email" type="text" autocomplete="off" />
            </el-form-item>

            <el-form-item label="账号状态" prop="delFlag">
              <el-button :type="userDetailForm.submitData.delFlag == '0' ? 'success' : 'danger' " size="small" disabled>
                {{ userDetailForm.submitData.delFlag == '0' ? '存在' : '删除' }}
              </el-button>
            </el-form-item>

            <el-form-item label="创建者" prop="createBy">
              <el-input :value="userDetailForm.submitData.createBy ? userDetailForm.submitData.createBy :'系统生成'"
                disabled type="text" autocomplete="off" />
            </el-form-item>

            <el-form-item label="更新时间" prop="updateTime">
              <el-input v-model="userDetailForm.submitData.updateTime" type="text" disabled autocomplete="off" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitUserDetailForm(userDetailFormRef)">更新</el-button>
              <el-button @click="resetUserDetailForm(userDetailFormRef)">重置</el-button>
            </el-form-item>

          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <!-- 修改密码 -->
          <el-form ref="resetPasswordFormRef" :model="resetPasswordForm.submitData" status-icon
            :rules="resetPasswordRules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input v-model="resetPasswordForm.submitData.oldPassword" show-password type="password"
                autocomplete="off" />
            </el-form-item>

            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="resetPasswordForm.submitData.newPassword" show-password type="password"
                autocomplete="off" />
            </el-form-item>

            <el-form-item label="确认新密码" prop="sureNewPassword">
              <el-input v-model="resetPasswordForm.submitData.sureNewPassword" show-password type="password"
                autocomplete="off" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitResetPasswordForm(resetPasswordFormRef)">更新</el-button>
              <el-button @click="resetResetPasswordForm(resetPasswordFormRef)">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </el-header>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, TabsPaneContext } from 'element-plus'

import { useRoute } from "vue-router"
import { useStore } from "vuex"

import { Operation } from "@element-plus/icons-vue"

import { update } from "@/service/user.service";
import { updatePassword } from "@/service/auth.service";


export default defineComponent({
  name: "",
  components: { Operation, },
  setup() {
    const route = useRoute();
    const store = useStore();
    const dialogVisible = ref(false);
    const userDetailFormRef = ref<FormInstance>();
    const resetPasswordFormRef = ref<FormInstance>();

    const tabActiveIndex = ref('baseUserInfo');
    let breadCrumbList = ref<any[]>([]);

    let userDetailForm = reactive<any>({
      submitData: {
        username: "",
        nickName: "",
        email: "",
        phonenumber: "",
        sex: '0',
        delFlag: "",
        createBy: "",
        updateTime: "",
      }
    });

    let userDetailRules = reactive<any>({
      username: [{ required: true, trigger: 'blur' }],
      nickName: [{ required: true, trigger: 'blur' }],
      email: [{ required: true, trigger: 'blur' }],
      sex: [{ required: true, trigger: 'blur' }],
      phonenumber: [{ required: true, trigger: 'blur' }],
      delFlag: [{ required: false, trigger: 'blur' }],
      createBy: [{ required: false, trigger: 'blur' }],
      updateTime: [{ required: false, trigger: 'blur' }],
    })

    let resetPasswordForm = reactive<any>({
      submitData: {
        oldPassword: "",
        newPassword: "",
        sureNewPassword: "",
      }
    });

    // 校验两次输入的新密码是否一样
    const validateSureNewPassword = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== resetPasswordForm.submitData.newPassword) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }

    let resetPasswordRules = reactive<any>({
      oldPassword: [{ required: true, min: 6, max: 18, trigger: 'blur' }],
      newPassword: [{ required: true, min: 6, max: 18, trigger: 'blur' }],
      sureNewPassword: [{ validator: validateSureNewPassword, required: true, min: 6, max: 18, trigger: 'blur' }],
    })


    watch(() => route.matched, (newVal) => {
      breadCrumbList.value = newVal.filter(r => r.meta && r.meta.title);
    }, { immediate: true })

    onMounted(() => userDetailForm.submitData = store.getters["auth/userDetail"]);

    const logoutHandler = () => {
      ElMessageBox.confirm('确定要退出吗？', { confirmButtonText: '确定', cancelButtonText: '再看看', type: 'warning' })
        .then(() => store.dispatch("auth/logoutHandler"))
        .catch(() => { })
    }

    const handleClose = (done: () => void) => dialogVisible.value = false;

    const submitUserDetailForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (!valid) {
          return false
        } else {
          // 更新用户信息
          update(userDetailForm.submitData).then(res => {
            const { code, message, data } = res;
            if (code == 200) {
              // 修改成功
              userDetailForm.submitData = data;
              store.dispatch("auth/saveUserInfo", { userInfo: data, token: store.getters["auth/token"] });
              ElMessage({ message, type: 'success' });
              dialogVisible.value = false;
            } else {
              // 修改失败
              ElMessage({ message, type: 'error' });
            }
          }).catch(err => {
            console.log(err);
          })
        }
      })
    }

    const resetUserDetailForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    const submitResetPasswordForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (!valid) {
          return false
        } else {
          // 更新密码
          resetPasswordForm.submitData["userId"] = store.getters["auth/userId"]
          updatePassword(resetPasswordForm.submitData).then(res => {
            const { code, message, data } = res;
            if (code == 200) {
              // 修改成功
              ElMessage({ message, type: 'success' });
              dialogVisible.value = false;
              store.dispatch("auth/logoutHandler");
            } else {
              // 修改失败
              ElMessage({ message, type: 'error' });
            }
          }).catch(err => {
            console.log(err);
          })
        }
      })
    }

    const resetResetPasswordForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    const handleClick = (tab: TabsPaneContext, event: Event) => { }

    return {
      tabActiveIndex, userDetailFormRef, userDetailForm, userDetailRules, dialogVisible, resetPasswordFormRef, breadCrumbList, resetPasswordRules, resetPasswordForm,
      handleClose, handleClick, resetUserDetailForm, submitUserDetailForm, logoutHandler, submitResetPasswordForm, resetResetPasswordForm
    }
  }
});
</script>

<style lang="less" scoped>
.el-header {
  width: 100%;
  // text-align: right;
  line-height: 60px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-right {
    display: flex;
    align-items: center;
    justify-content: center;

    ::v-deep .el-tooltip__trigger {
      display: flex;
      margin: 0 8px;
    }
  }

  ::v-deep .el-dialog__header {
    padding-bottom: 0;
  }

  ::v-deep .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }

  ::v-deep .el-dialog__footer {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>