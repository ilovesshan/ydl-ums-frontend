import type { Directive, DirectiveBinding } from "vue";

import store from "@/store";

interface ElType extends HTMLElement {
  copyData: string | number;
  __handleClick__: any;
}


// 权限校验自定义指令
const permission: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    const needPermission: string = binding.value
    const permissions: string[] = store.getters["auth/permissions"]
    if(!permissions.includes(needPermission)){
      el.parentNode?.removeChild(el);
    }
  },

  updated(el: ElType, binding: DirectiveBinding) {
  },

  beforeUnmount(el: ElType) {
  }
}

export default permission