import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const permission = store.getters && store.getters.permission

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = permission.some(item => {
        return permissionRoles.includes(item)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['createUser','editUser']"`)
    }
  }
}
