<template>
  <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#F8F9FA">
    <v-card class="login-card" elevation="2" style="padding:32px">
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:20px;font-weight:700;color:rgba(0,0,0,0.87)">オンラインクラス</div>
        <div style="font-size:13px;color:rgba(0,0,0,0.5);margin-top:4px">ログインしてください</div>
      </div>

      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          label="メールアドレス"
          type="email"
          variant="outlined"
          density="compact"
          class="mb-3"
          :error-messages="errors.email"
          prepend-inner-icon="mdi-email-outline"
        />

        <v-text-field
          v-model="password"
          label="パスワード"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          density="compact"
          class="mb-4"
          :error-messages="errors.password"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        />

        <v-btn
          type="submit"
          color="primary"
          block
          size="large"
          :loading="loading"
          style="font-size:15px;font-weight:500"
        >
          ログインする
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { login } = useStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errors = ref({ email: '', password: '' })

async function handleLogin() {
  errors.value = { email: '', password: '' }

  if (!email.value) {
    errors.value.email = 'メールアドレスを入力してください'
    return
  }
  if (!password.value) {
    errors.value.password = 'パスワードを入力してください'
    return
  }

  loading.value = true
  await new Promise(r => setTimeout(r, 800))

  const success = login(email.value, password.value)
  loading.value = false

  if (success) {
    const redirect = useRoute().query.redirect as string
    navigateTo(redirect || '/courses/okzM4EDI6MGb')
  }
}
</script>
