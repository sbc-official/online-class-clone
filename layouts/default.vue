<template>
  <v-app>
    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      location="top right"
      :timeout="3000"
    >
      <div style="display:flex;align-items:center;gap:8px">
        <v-icon size="18">{{ snackbar.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle' }}</v-icon>
        {{ snackbar.text }}
      </div>
      <template v-slot:actions>
        <v-btn variant="text" size="small" @click="snackbar.show = false">
          <v-icon size="16">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Header -->
    <v-app-bar elevation="1" color="white" height="64" style="z-index:1005">
      <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" />
      <v-toolbar-title
        style="font-size:16px;font-weight:600;color:rgba(0,0,0,0.87);cursor:pointer"
        @click="navigateTo('/courses/okzM4EDI6MGb')"
      >
        オンラインクラス
      </v-toolbar-title>
      <v-spacer />
      <v-btn variant="outlined" size="small" class="mr-3" style="font-size:13px">
        <v-icon start size="16">mdi-help-circle-outline</v-icon>
        お問い合わせ
      </v-btn>
      <v-avatar
        v-if="isLoggedIn"
        size="36"
        color="#1867C0"
        class="mr-2"
        style="cursor:pointer"
      >
        <span style="color:white;font-size:14px;font-weight:500">{{ user?.initial }}</span>
      </v-avatar>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="!mobile"
      :temporary="mobile"
      width="256"
      class="sidebar-dark"
      style="z-index:1004"
    >
      <v-list nav density="compact" bg-color="transparent" style="padding-top:8px">
        <v-list-group v-for="(org, oi) in organizations" :key="oi" :value="org.name">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="org.name">
              <template v-slot:append>
                <v-badge v-if="org.hasNew" dot color="pink" offset-x="-4" offset-y="4" />
              </template>
            </v-list-item>
          </template>
          <v-list-item
            v-for="(course, ci) in org.courses"
            :key="ci"
            :title="course.name"
            @click="goToCourse(course.id)"
            :active="currentCourse.id === course.id"
            active-color="white"
            style="min-height:36px"
          />
        </v-list-group>
      </v-list>
      <div class="sidebar-bottom-icon">
        <v-icon color="white" size="24">mdi-chevron-double-down</v-icon>
      </div>
    </v-navigation-drawer>

    <!-- Main -->
    <v-main style="background:#F8F9FA">
      <v-container style="max-width:1000px">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const drawer = ref(!mobile.value)
const { user, isLoggedIn, organizations, currentCourse, snackbar } = useStore()

watch(mobile, (val) => {
  drawer.value = !val
})

function goToCourse(courseId: string) {
  if (mobile.value) drawer.value = false
  navigateTo(`/courses/${courseId}`)
}
</script>
