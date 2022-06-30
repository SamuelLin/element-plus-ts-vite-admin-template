<template>
  <h1>Home</h1>
  <p v-permission="['admin']">admin</p>
  <p v-permission="['user']">user</p>
  <HelloI18n />
</template>
