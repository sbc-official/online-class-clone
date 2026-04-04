<template>
  <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#F8F9FA">
    <v-card class="login-card" elevation="2" style="padding:32px">
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:20px;font-weight:700;color:rgba(0,0,0,0.87)">オンラインクラス</div>
        <div style="font-size:13px;color:rgba(0,0,0,0.5);margin-top:4px">ログインしてください</div>
      </div>

      <!-- Login error alert -->
      <v-alert
        v-if="loginError"
        type="error"
        variant="tonal"
        density="compact"
        class="mb-4"
        style="font-size:13px"
        closable
        @click:close="loginError = ''"
      >
        {{ loginError }}
      </v-alert>

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
          @input="clearErrors"
        />

        <v-text-field
          v-model="password"
          label="パスワード"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          density="compact"
          class="mb-1"
          :error-messages="errors.password"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          @input="clearErrors"
        />

        <div style="text-align:right;margin-bottom:16px">
          <a href="#" style="font-size:12px;color:#1867C0;text-decoration:none">パスワードをお忘れですか？</a>
        </div>

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

      <!-- Demo credentials hint -->
      <div style="margin-top:20px;padding:12px;background:#f5f5f5;border-radius:6px">
        <div style="font-size:11px;color:rgba(0,0,0,0.5);margin-bottom:6px">デモアカウント</div>
        <div style="font-size:12px;color:rgba(0,0,0,0.6)">
          <strong>Email:</strong> test@example.com<br>
          <strong>Pass:</strong> test1234
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { login, DEFAULT_COURSE_ID } = useStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const loginError = ref('')
const errors = ref({ email: '', password: '' })

function clearErrors() {
  loginError.value = ''
  errors.value = { email: '', password: '' }
}

async function handleLogin() {
  errors.value = { email: '', password: '' }
  loginError.value = ''

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

  const result = login(email.value, password.value)
  loading.value = false

  if (result.success) {
    const redirect = useRoute().query.redirect as string
    navigateTo(redirect || `/courses/${DEFAULT_COURSE_ID}`)
  } else {
    loginError.value = result.error || 'ログインに失敗しました'
  }
}
</script>
