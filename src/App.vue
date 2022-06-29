<script lang="ts" setup>
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const locale = appStore.locale === 'en' ? en : zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
