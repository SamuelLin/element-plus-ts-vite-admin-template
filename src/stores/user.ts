import { defineStore } from 'pinia'
import { getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    roles: []
  }),
  actions: {
    // user login
    async login() {
      console.log('login')
    },

    // user logout,
    logout() {
      this.token = ''
      this.roles = []
      removeToken()
      resetRouter()
      // TODO: 頁籤實作
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      // dispatch('tagsView/delAllViews', null, { root: true })
    },

    getInfo() {
      return new Promise((resolve, reject) => {
        const mockData = { name: 'Test', roles: ['admin'] }

        this.roles = mockData.roles
        this.name = mockData.name

        resolve(mockData)

        // getInfo()
        //   .then((response) => {

        //     if (!data) {
        //       reject('Verification failed, please Login again.')
        //     }

        //     const { roles, name, avatar, introduction } = data

        //     // roles must be a non-empty array
        //     if (!roles || roles.length <= 0) {
        //       reject('getInfo: roles must be a non-null array!')
        //     }

        //     commit('SET_ROLES', roles)
        //     commit('SET_NAME', name)
        //     commit('SET_AVATAR', avatar)
        //     commit('SET_INTRODUCTION', introduction)
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    },

    // remove token
    resetToken() {
      return new Promise((resolve) => {
        this.token = ''
        this.roles = []
        removeToken()
        resolve()
      })
    }
  }
})
