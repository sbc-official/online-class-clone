export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/sign_in') return

  // Check localStorage directly as a fallback in case useState hasn't hydrated yet
  const { isLoggedIn } = useStore()

  if (!isLoggedIn.value) {
    // Double-check localStorage directly
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('oc_user')
        if (saved && JSON.parse(saved)) return // User exists in storage, let hydration complete
      } catch { /* ignore */ }
    }
    return navigateTo(`/sign_in?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
