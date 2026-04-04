export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useStore()

  if (to.path === '/sign_in') return

  if (!isLoggedIn.value) {
    return navigateTo(`/sign_in?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
