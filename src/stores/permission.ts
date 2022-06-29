import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'

// https://router.vuejs.org/guide/advanced/dynamic-routing.html#adding-routes-inside-navigation-guards

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: [],
    addRoutes: []
  }),
  actions: {
    generateRoutes(roles: Array<string>) {
      return new Promise((resolve) => {
        let accessedRoutes

        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }

        this.addRoutes = accessedRoutes
        this.routes = constantRoutes.concat(accessedRoutes)

        resolve(accessedRoutes)
      })
    }
  }
})
