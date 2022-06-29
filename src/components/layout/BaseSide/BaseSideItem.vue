<script lang="ts" setup>
import { ref } from 'vue'
import { isExternal } from '@/utils/validate'

const props = defineProps({
  item: Object,
  basePath: String
})

const onlyOneChild = ref(null)

function hasOneShowingChild(children = [], parent) {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

function resolvePath(routePath) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return props.basePath + `${props.basePath === '/' ? '' : '/'}` + routePath
}
</script>

<template>
  <template v-if="!item.hidden">
    <el-menu-item
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
      :index="resolvePath(onlyOneChild.path)"
    >
      <el-icon v-if="onlyOneChild.meta.icon">
        <component :is="onlyOneChild.meta.icon" />
      </el-icon>
      <template #title>{{ onlyOneChild.meta.title }}</template>
    </el-menu-item>

    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>

      <BaseSideItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped>
.el-sub-menu .el-menu-item {
  background-color: #4d555c;

  &:hover {
    background-color: rgb(67, 74, 80);
  }
}
</style>
