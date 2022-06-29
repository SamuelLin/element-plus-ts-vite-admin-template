<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { usePermissionStore } from '@/stores/permission'

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const handleOpen = (key, keyPath) => {
  console.log('handleOpen')
}
const handleClose = (key, keyPath) => {
  console.log('handleClose')
}

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<template>
  <el-scrollbar height="100vh" style="background-color: #545c64">
    <el-menu
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      style="border-right: none"
      router
      :default-active="activeMenu"
      :collapse="appStore.sidebar.opened"
      @open="handleOpen"
      @close="handleClose"
    >
      <BaseSideItem
        v-for="pRoute in permissionStore.routes"
        :key="pRoute.path"
        :item="pRoute"
        :base-path="pRoute.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
