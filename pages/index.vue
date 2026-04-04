<script setup lang="ts">
const { isLoggedIn, DEFAULT_COURSE_ID } = useStore()

onMounted(() => {
  if (isLoggedIn.value) {
    navigateTo(`/courses/${DEFAULT_COURSE_ID}`)
  } else {
    navigateTo('/sign_in')
  }
})
</script>

<template>
  <div />
</template>
