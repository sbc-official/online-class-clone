<script setup lang="ts">
const { isLoggedIn } = useStore()

onMounted(() => {
  if (isLoggedIn.value) {
    navigateTo('/courses/okzM4EDI6MGb')
  } else {
    navigateTo('/sign_in')
  }
})
</script>

<template>
  <div />
</template>
