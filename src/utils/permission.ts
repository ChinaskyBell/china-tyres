// import { useUserStoreHook } from "@/store/modules/user"
import { getButtonAuthorities } from "@/utils/cache/local-storage"

/** 全局权限判断函数，和权限指令 v-permission 功能类似 */
export const checkPermission = (permissionRoles: string[]): boolean => {
  if (Array.isArray(permissionRoles) && permissionRoles.length > 0) {
    // const { roles } = useUserStoreHook()
    const roles = getButtonAuthorities()
    return roles.some((role) => permissionRoles.includes(role))
  } else {
    console.error("need roles! Like checkPermission(['admin','editor'])")
    return false
  }
}
