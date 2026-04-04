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
              v-for="(block, bi) in category.blocks"
              :key="block.id"
              :dot-color="block.completed ? '#4CAF50' : '#bdbdbd'"
              size="small"
            >
              <div class="block-card">
                <div class="block-title">{{ block.title }}</div>

                <!-- Article -->
                <template v-if="block.type === 'article'">
                  <div class="block-type-indicator">
                    <v-icon size="16" color="rgba(0,0,0,0.5)">mdi-file-document-outline</v-icon>
                    記事を読んで学習しましょう
                  </div>
                  <v-btn variant="outlined" size="small" color="primary" style="font-size:13px">
                    記事を読む
                  </v-btn>
                </template>

                <!-- Video -->
                <template v-if="block.type === 'video'">
                  <div class="block-type-indicator">
                    <v-icon size="16" color="rgba(0,0,0,0.5)">mdi-play-circle-outline</v-icon>
                    動画を見て学習しましょう
                  </div>
                  <div class="video-placeholder">
                    <div class="play-btn">
                      <v-icon>mdi-play</v-icon>
                    </div>
                  </div>

                  <!-- Complete Button -->
                  <v-btn
                    v-if="!block.completed"
                    color="#4CAF50"
                    block
                    class="mt-2"
                    style="font-size:14px;font-weight:500"
                    @click="toggleBlockComplete(block.id)"
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
                  <v-btn variant="outlined" size="small" class="mt-2" color="primary" style="font-size:12px">
                    AIに質問する
                  </v-btn>
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
  </v-row>
</template>

<script setup lang="ts">
const route = useRoute()
const { currentCourse, toggleBlockComplete } = useStore()

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

function goNext() {
  if (hasNext.value) {
    const next = currentCourse.value.categories[categoryIndex.value + 1]
    navigateTo(`/categories/${next.id}/blocks`)
    window.scrollTo(0, 0)
  }
}
</script>
