<template>
  <v-row dense class="flex-column" v-if="category">
    <!-- Breadcrumb -->
    <v-col style="margin-bottom:8px">
      <NuxtLink :to="`/courses/${currentCourse.id}`" class="breadcrumb-link">
        {{ currentCourse.name }}
      </NuxtLink>
      <span class="breadcrumb-sep">＞</span>
      <span class="breadcrumb-current">{{ category.name }}</span>
    </v-col>

    <!-- Timeline Card -->
    <v-col>
      <v-card elevation="1">
        <v-card-text style="padding:0">
          <v-timeline
            align="start"
            density="comfortable"
            side="end"
          >
            <v-timeline-item
              v-for="block in category.blocks"
              :key="block.id"
              :dot-color="block.completed ? '#4CAF50' : '#bdbdbd'"
              size="small"
            >
              <div class="block-card">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
                  <div class="block-title">{{ block.title }}</div>
                  <v-btn
                    icon
                    variant="text"
                    size="x-small"
                    :color="isBookmarked(block.id) ? '#FFB300' : 'rgba(0,0,0,0.3)'"
                    @click="toggleBookmark(block.id, block.title, category.name)"
                  >
                    <v-icon>{{ isBookmarked(block.id) ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}</v-icon>
                  </v-btn>
                </div>

                <!-- Article -->
                <template v-if="block.type === 'article'">
                  <div class="block-type-indicator">
                    <v-icon size="16" color="rgba(0,0,0,0.5)">mdi-file-document-outline</v-icon>
                    記事を読んで学習しましょう
                  </div>
                  <v-btn
                    variant="outlined"
                    size="small"
                    color="primary"
                    style="font-size:13px"
                    @click="openArticle(block)"
                  >
                    記事を読む
                  </v-btn>

                  <!-- Complete for article -->
                  <div style="margin-top:12px">
                    <v-btn
                      v-if="!block.completed"
                      color="#4CAF50"
                      block
                      style="font-size:14px;font-weight:500"
                      @click="toggleBlockComplete(block.id)"
                    >
                      読了して次へ
                    </v-btn>
                    <v-btn
                      v-else
                      color="#4CAF50"
                      variant="tonal"
                      block
                      style="font-size:14px"
                      @click="toggleBlockComplete(block.id)"
                    >
                      <v-icon start>mdi-check</v-icon>
                      読了済み
                    </v-btn>
                  </div>
                </template>

                <!-- Video -->
                <template v-if="block.type === 'video'">
                  <div class="block-type-indicator">
                    <v-icon size="16" color="rgba(0,0,0,0.5)">mdi-play-circle-outline</v-icon>
                    動画を見て学習しましょう
                    <span v-if="block.duration" style="margin-left:auto;font-size:12px;color:rgba(0,0,0,0.4)">
                      {{ block.duration }}
                    </span>
                  </div>

                  <!-- Video Player -->
                  <div
                    class="video-placeholder"
                    :class="{ 'video-playing': playingVideo === block.id }"
                    @click="toggleVideoPlay(block.id)"
                  >
                    <!-- Fake progress bar when playing -->
                    <div
                      v-if="playingVideo === block.id"
                      class="video-progress-bar"
                    >
                      <div class="video-progress-fill" :style="{ width: videoProgress + '%' }"></div>
                    </div>

                    <!-- Controls overlay -->
                    <div class="video-controls-overlay" :class="{ 'is-playing': playingVideo === block.id }">
                      <div class="play-btn">
                        <v-icon>{{ playingVideo === block.id ? 'mdi-pause' : 'mdi-play' }}</v-icon>
                      </div>
                    </div>

                    <!-- Duration badge -->
                    <div v-if="block.duration && playingVideo !== block.id" class="video-duration-badge">
                      {{ block.duration }}
                    </div>

                    <!-- Playing indicator -->
                    <div v-if="playingVideo === block.id" class="video-playing-indicator">
                      <div class="video-elapsed">{{ formatElapsed(videoElapsed) }}</div>
                      <v-icon size="14" color="white" style="margin:0 4px">mdi-circle-medium</v-icon>
                      <div class="video-total">{{ block.duration }}</div>
                    </div>
                  </div>

                  <!-- Complete Button -->
                  <v-btn
                    v-if="!block.completed"
                    color="#4CAF50"
                    block
                    class="mt-2"
                    style="font-size:14px;font-weight:500"
                    @click="completeAndNext(block)"
                  >
                    受講完了して次へ
                  </v-btn>
                  <v-btn
                    v-else
                    color="#4CAF50"
                    variant="tonal"
                    block
                    class="mt-2"
                    style="font-size:14px"
                    @click="toggleBlockComplete(block.id)"
                  >
                    <v-icon start>mdi-check</v-icon>
                    受講完了済み
                  </v-btn>
                </template>

                <!-- AI Question -->
                <div class="ai-question-section" v-if="block.hasAiQuestion">
                  <div class="aq-label">
                    <v-icon size="14" color="#1867C0">mdi-chat-processing-outline</v-icon>
                    質問やよくわからないことがあればAIに質問！
                  </div>
                  <div class="aq-text">
                    おさる講師のオリエンテーションやQ&Aの内容を学習させています。<br>
                    全ての質問に答えられるわけではありませんが、お気軽にお試しください。
                  </div>
                  <v-btn
                    variant="outlined"
                    size="small"
                    class="mt-2"
                    color="primary"
                    style="font-size:12px"
                    @click="openAiChat(block.id)"
                  >
                    AIに質問する
                  </v-btn>
                </div>

                <!-- Review input -->
                <div class="review-section" v-if="block.completed">
                  <div v-if="!showReviewInput[block.id]" style="margin-top:12px">
                    <v-btn
                      variant="text"
                      size="small"
                      color="rgba(0,0,0,0.5)"
                      style="font-size:12px"
                      @click="showReviewInput[block.id] = true"
                    >
                      <v-icon start size="14">mdi-pencil</v-icon>
                      感想を書く
                    </v-btn>
                  </div>
                  <div v-else style="margin-top:12px">
                    <v-textarea
                      v-model="reviewText[block.id]"
                      variant="outlined"
                      density="compact"
                      rows="2"
                      placeholder="このブロックの感想を記入..."
                      style="font-size:13px"
                    />
                    <div style="display:flex;gap:8px;justify-content:flex-end">
                      <v-btn size="small" variant="text" @click="showReviewInput[block.id] = false">キャンセル</v-btn>
                      <v-btn
                        size="small"
                        color="primary"
                        @click="submitReview(block)"
                        :disabled="!reviewText[block.id]?.trim()"
                      >
                        送信
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Bottom Navigation -->
    <v-col>
      <div class="bottom-nav">
        <v-btn variant="outlined" style="font-size:13px;color:rgba(0,0,0,0.7)" @click="navigateTo(`/courses/${currentCourse.id}`)">
          <v-icon start size="16">mdi-arrow-left</v-icon>
          カテゴリ一覧へ戻る
        </v-btn>
        <v-btn
          color="#1867C0"
          style="font-size:13px"
          @click="goNext"
          :disabled="!hasNext"
        >
          次のカテゴリへ進む
          <v-icon end size="16">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-col>

    <!-- Article Dialog -->
    <v-dialog v-model="articleViewerOpen" max-width="700" scrollable>
      <v-card v-if="articleViewerBlock">
        <v-card-title style="font-size:16px;font-weight:700;padding:20px 24px 12px">
          {{ articleViewerBlock.title }}
        </v-card-title>
        <v-divider />
        <v-card-text style="padding:24px;white-space:pre-wrap;font-size:14px;line-height:1.8;color:rgba(0,0,0,0.8)">{{ articleViewerBlock.content || 'コンテンツは現在準備中です。' }}</v-card-text>
        <v-divider />
        <v-card-actions style="padding:12px 16px">
          <v-spacer />
          <v-btn variant="text" @click="closeArticle">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- AI Chat Dialog -->
    <v-dialog v-model="aiChatOpen" max-width="500" scrollable>
      <v-card>
        <v-card-title style="font-size:15px;font-weight:600;padding:16px 20px;display:flex;align-items:center;gap:8px">
          <v-icon size="20" color="#1867C0">mdi-chat-processing-outline</v-icon>
          AIに質問する
        </v-card-title>
        <v-divider />
        <v-card-text style="padding:16px 20px;min-height:300px;max-height:400px;overflow-y:auto">
          <!-- Chat messages -->
          <div v-for="(msg, i) in aiMessages" :key="i" :class="['ai-chat-msg', msg.role]">
            <div class="ai-chat-bubble">{{ msg.text }}</div>
          </div>
          <div v-if="aiTyping" class="ai-chat-msg assistant">
            <div class="ai-chat-bubble ai-typing">
              <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            </div>
          </div>
        </v-card-text>
        <v-divider />
        <div style="padding:12px 16px;display:flex;gap:8px">
          <v-text-field
            v-model="aiInput"
            variant="outlined"
            density="compact"
            placeholder="質問を入力..."
            hide-details
            @keyup.enter="sendAiMessage"
            style="font-size:13px"
          />
          <v-btn icon color="primary" size="small" @click="sendAiMessage" :disabled="!aiInput.trim()">
            <v-icon size="18">mdi-send</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
const route = useRoute()
const {
  currentCourse, toggleBlockComplete,
  openArticle, closeArticle, articleViewerOpen, articleViewerBlock,
  openAiChat, closeAiChat, aiChatOpen,
  toggleBookmark, isBookmarked,
  addReview, showSnackbar,
} = useStore()

const categoryId = computed(() => route.params.categoryId as string)
const category = computed(() =>
  currentCourse.value.categories.find(c => c.id === categoryId.value)
)
const categoryIndex = computed(() =>
  currentCourse.value.categories.findIndex(c => c.id === categoryId.value)
)
const hasNext = computed(() =>
  categoryIndex.value < currentCourse.value.categories.length - 1
)

// --- Video Player ---
const playingVideo = ref<string | null>(null)
const videoProgress = ref(0)
const videoElapsed = ref(0)
let videoInterval: ReturnType<typeof setInterval> | null = null

function toggleVideoPlay(blockId: string) {
  if (playingVideo.value === blockId) {
    // Pause
    playingVideo.value = null
    if (videoInterval) { clearInterval(videoInterval); videoInterval = null }
  } else {
    // Play new
    if (videoInterval) { clearInterval(videoInterval); videoInterval = null }
    playingVideo.value = blockId
    videoProgress.value = 0
    videoElapsed.value = 0
    videoInterval = setInterval(() => {
      videoElapsed.value += 1
      videoProgress.value = Math.min(videoProgress.value + 0.3, 95)
    }, 1000)
  }
}

function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function completeAndNext(block: any) {
  toggleBlockComplete(block.id)
  // Scroll to next block
  const idx = category.value?.blocks.findIndex(b => b.id === block.id) ?? -1
  if (idx >= 0 && category.value && idx < category.value.blocks.length - 1) {
    // Auto-scroll effect
    setTimeout(() => {
      const nextEl = document.querySelector(`[data-block-id="${category.value!.blocks[idx + 1].id}"]`)
      nextEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 300)
  }
  showSnackbar('受講完了しました！', 'success')
}

// --- Review ---
const showReviewInput = ref<Record<string, boolean>>({})
const reviewText = ref<Record<string, string>>({})

function submitReview(block: any) {
  if (reviewText.value[block.id]?.trim()) {
    addReview(block.id, block.title, category.value?.name || '', reviewText.value[block.id].trim())
    showReviewInput.value[block.id] = false
    reviewText.value[block.id] = ''
    showSnackbar('感想を保存しました', 'success')
  }
}

// --- AI Chat ---
interface ChatMessage { role: 'user' | 'assistant'; text: string }
const aiMessages = ref<ChatMessage[]>([
  { role: 'assistant', text: 'こんにちは！この講座の内容について質問があればお気軽にどうぞ。おさる講師のオリエンテーションやQ&Aの内容をもとにお答えします。' }
])
const aiInput = ref('')
const aiTyping = ref(false)

const AI_RESPONSES = [
  'とても良い質問ですね。この講座では、まず基本的な考え方を理解してから実践に移ることを推奨しています。焦らず1つずつ進めていきましょう。',
  'おさる講師もよく言っていますが、「完璧を目指すより、まずやってみること」が大切です。70点でもいいから行動に移すことが成功への近道です。',
  'その点については、次のカテゴリで詳しく解説されています。まずは今のカテゴリの内容をしっかり理解してから進みましょう。',
  'セールスファネルの設計は、最初は難しく感じるかもしれません。でも、テンプレートに沿って進めれば、必ず形になります。グループチャットで他の受講生のファネルも参考にしてみてください。',
  '申し訳ありません、その質問については私の知識の範囲外です。グループチャットでおさる講師に直接質問されることをおすすめします。',
  'はい、その理解で合っています。ポイントは「お客様の悩みに寄り添うこと」です。自分が売りたいものではなく、お客様が求めているものを提供する視点を持ちましょう。',
]

function sendAiMessage() {
  if (!aiInput.value.trim()) return
  aiMessages.value.push({ role: 'user', text: aiInput.value.trim() })
  aiInput.value = ''
  aiTyping.value = true
  setTimeout(() => {
    aiTyping.value = false
    const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)]
    aiMessages.value.push({ role: 'assistant', text: response })
  }, 1200 + Math.random() * 800)
}

// --- Navigation ---
function goNext() {
  if (hasNext.value) {
    const next = currentCourse.value.categories[categoryIndex.value + 1]
    navigateTo(`/categories/${next.id}/blocks`)
    window.scrollTo(0, 0)
  }
}

// Cleanup on unmount
onUnmounted(() => {
  if (videoInterval) clearInterval(videoInterval)
})
</script>
