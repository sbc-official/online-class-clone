<template>
  <v-row dense class="flex-column">
    <!-- Course Title -->
    <v-col>
      <h1 style="font-size:20px;font-weight:700;color:rgba(0,0,0,0.87);margin-bottom:4px">
        {{ currentCourse.name }}
      </h1>
    </v-col>

    <!-- Tabs -->
    <v-col>
      <v-tabs v-model="activeTab" class="course-tabs" color="#1867C0" slider-color="#1867C0">
        <v-tab v-for="tab in tabs" :key="tab" :value="tab">{{ tab }}</v-tab>
      </v-tabs>
      <v-divider />
    </v-col>

    <!-- Course Tab -->
    <template v-if="activeTab === 'コース'">
      <v-col>
        <div style="font-size:14px;font-weight:500;color:rgba(0,0,0,0.7);margin-bottom:8px">学習の進捗</div>
        <div class="progress-section">
          <v-progress-circular
            :model-value="progressPercent"
            :size="88"
            :width="6"
            color="#1867C0"
          >
            <div style="text-align:center">
              <div style="font-size:22px;font-weight:700;color:rgba(0,0,0,0.87)">{{ progressPercent }}%</div>
              <div style="font-size:11px;color:rgba(0,0,0,0.5)">完了</div>
            </div>
          </v-progress-circular>
          <div class="progress-stats">
            <div class="label">完了カテゴリ数</div>
            <div>
              <span class="value">{{ completedCategories }}</span>
              <span style="font-size:14px;color:rgba(0,0,0,0.5)"> / {{ currentCourse.categories.length }}</span>
            </div>
            <div class="sub">完了ブロック数 {{ completedBlocks }} / {{ totalBlocks }}</div>
          </div>
          <div class="progress-actions">
            <v-btn color="#4CAF50" style="font-size:14px;font-weight:500" @click="goToFirstIncomplete">
              つづきから学習する
            </v-btn>
            <v-btn variant="outlined" style="font-size:13px;color:rgba(0,0,0,0.7)" @click="progressDetailOpen = true">
              進捗の詳細を確認
            </v-btn>
          </div>
        </div>
      </v-col>

      <!-- Category Table -->
      <v-col style="margin-top:8px">
        <div class="category-table">
          <div class="category-table-header">
            <span></span>
            <span>カテゴリ一覧</span>
            <span class="hide-mobile">完了予定日</span>
            <span class="hide-mobile">進捗状況</span>
          </div>
          <div
            class="category-row"
            v-for="(cat, i) in currentCourse.categories"
            :key="cat.id"
          >
            <span class="num">{{ i + 1 }} / {{ currentCourse.categories.length }}</span>
            <div>
              <span class="name">
                <NuxtLink :to="`/categories/${cat.id}/blocks`">{{ cat.name }}</NuxtLink>
              </span>
              <div class="mobile-category-meta">
                <span style="font-size:11px;color:rgba(0,0,0,0.4)">完了予定日</span>
                <span
                  class="status-chip"
                  :class="getStatusClass(cat)"
                  style="font-size:11px"
                >{{ getCategoryStatus(cat) }}</span>
              </div>
            </div>
            <span class="date"></span>
            <span class="status-col">
              <span class="status-chip" :class="getStatusClass(cat)">{{ getCategoryStatus(cat) }}</span>
            </span>
          </div>
        </div>
      </v-col>
    </template>

    <!-- 学習計画 Tab -->
    <v-col v-if="activeTab === '学習計画'">
      <v-card variant="flat" style="padding:24px">
        <div style="font-size:15px;font-weight:600;color:rgba(0,0,0,0.87);margin-bottom:16px">
          <v-icon size="20" color="#1867C0" style="margin-right:6px">mdi-calendar-check</v-icon>
          学習計画
        </div>
        <div class="study-plan-grid">
          <div
            v-for="(cat, i) in currentCourse.categories"
            :key="cat.id"
            class="study-plan-item"
            :class="{ completed: isCategoryComplete(cat), current: isCategoryCurrent(cat) }"
          >
            <div class="study-plan-num">{{ i + 1 }}</div>
            <div class="study-plan-info">
              <div class="study-plan-name">{{ cat.name }}</div>
              <div class="study-plan-blocks">
                {{ cat.blocks.filter(b => b.completed).length }} / {{ cat.blocks.length }} ブロック
              </div>
            </div>
            <v-icon v-if="isCategoryComplete(cat)" size="18" color="#4CAF50">mdi-check-circle</v-icon>
            <v-icon v-else-if="isCategoryCurrent(cat)" size="18" color="#1867C0">mdi-play-circle</v-icon>
            <v-icon v-else size="18" color="rgba(0,0,0,0.2)">mdi-circle-outline</v-icon>
          </div>
        </div>
      </v-card>
    </v-col>

    <!-- 感想履歴 Tab -->
    <v-col v-if="activeTab === '感想履歴'">
      <v-card variant="flat" style="padding:24px">
        <div style="font-size:15px;font-weight:600;color:rgba(0,0,0,0.87);margin-bottom:16px">
          <v-icon size="20" color="#1867C0" style="margin-right:6px">mdi-message-text</v-icon>
          感想履歴
        </div>
        <div v-if="reviews.length === 0" style="text-align:center;color:rgba(0,0,0,0.4);padding:40px 0">
          <v-icon size="48" color="rgba(0,0,0,0.15)">mdi-message-text-outline</v-icon>
          <div style="margin-top:12px;font-size:14px">まだ感想がありません</div>
          <div style="font-size:12px;margin-top:4px">ブロックを完了すると、感想を記入できます</div>
        </div>
        <div v-else>
          <div v-for="(review, i) in sortedReviews" :key="i" class="review-card">
            <div class="review-meta">
              <span class="review-category">{{ review.categoryName }}</span>
              <span class="review-date">{{ formatDate(review.date) }}</span>
            </div>
            <div class="review-block-title">{{ review.blockTitle }}</div>
            <div class="review-text">{{ review.text }}</div>
          </div>
        </div>
      </v-card>
    </v-col>

    <!-- マイリスト Tab -->
    <v-col v-if="activeTab === 'マイリスト'">
      <v-card variant="flat" style="padding:24px">
        <div style="font-size:15px;font-weight:600;color:rgba(0,0,0,0.87);margin-bottom:16px">
          <v-icon size="20" color="#FFB300" style="margin-right:6px">mdi-bookmark</v-icon>
          マイリスト
        </div>
        <div v-if="bookmarks.length === 0" style="text-align:center;color:rgba(0,0,0,0.4);padding:40px 0">
          <v-icon size="48" color="rgba(0,0,0,0.15)">mdi-bookmark-outline</v-icon>
          <div style="margin-top:12px;font-size:14px">ブックマークがありません</div>
          <div style="font-size:12px;margin-top:4px">ブロックのブックマークアイコンで追加できます</div>
        </div>
        <div v-else>
          <div v-for="(bm, i) in bookmarks" :key="i" class="bookmark-card">
            <div style="flex:1">
              <div class="review-meta">
                <span class="review-category">{{ bm.categoryName }}</span>
                <span class="review-date">{{ formatDate(bm.date) }}</span>
              </div>
              <div class="review-block-title" style="cursor:pointer;color:#1867C0" @click="navigateToBlock(bm.blockId)">
                {{ bm.blockTitle }}
              </div>
            </div>
            <v-btn icon variant="text" size="x-small" color="rgba(0,0,0,0.3)" @click="toggleBookmark(bm.blockId, bm.blockTitle, bm.categoryName)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-col>

    <!-- Progress Detail Dialog -->
    <v-dialog v-model="progressDetailOpen" max-width="600" scrollable>
      <v-card>
        <v-card-title style="font-size:16px;font-weight:700;padding:20px 24px 12px">
          進捗の詳細
        </v-card-title>
        <v-divider />
        <v-card-text style="padding:16px 24px">
          <div style="text-align:center;margin-bottom:20px">
            <v-progress-circular :model-value="progressPercent" :size="100" :width="8" color="#1867C0">
              <div style="text-align:center">
                <div style="font-size:28px;font-weight:700">{{ progressPercent }}%</div>
                <div style="font-size:11px;color:rgba(0,0,0,0.5)">完了</div>
              </div>
            </v-progress-circular>
          </div>
          <div v-for="(cat, i) in currentCourse.categories" :key="cat.id" class="progress-detail-row">
            <div class="progress-detail-name">
              <span style="color:rgba(0,0,0,0.4);font-size:12px;min-width:24px">{{ i + 1 }}.</span>
              {{ cat.name }}
            </div>
            <div style="display:flex;align-items:center;gap:8px;min-width:120px">
              <v-progress-linear
                :model-value="getCategoryPercent(cat)"
                :color="isCategoryComplete(cat) ? '#4CAF50' : '#1867C0'"
                bg-color="rgba(0,0,0,0.08)"
                height="6"
                rounded
                style="flex:1"
              />
              <span style="font-size:12px;color:rgba(0,0,0,0.5);min-width:32px;text-align:right">
                {{ cat.blocks.filter(b => b.completed).length }}/{{ cat.blocks.length }}
              </span>
            </div>
          </div>
        </v-card-text>
        <v-divider />
        <v-card-actions style="padding:12px 16px">
          <v-spacer />
          <v-btn variant="text" @click="progressDetailOpen = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
const route = useRoute()
const {
  currentCourse, switchCourse,
  progressPercent, completedCategories, completedBlocks, totalBlocks,
  reviews, bookmarks, toggleBookmark, progressDetailOpen,
} = useStore()

// Switch course if URL param differs
watch(() => route.params.courseId, (id) => {
  if (id && id !== currentCourse.value.id) {
    switchCourse(id as string)
  }
}, { immediate: true })

const tabs = ['コース', '学習計画', '感想履歴', 'マイリスト']
const activeTab = ref('コース')

function getCategoryStatus(cat: any) {
  if (cat.blocks.length === 0) return '未完了'
  if (cat.blocks.every((b: any) => b.completed)) return '完了'
  if (cat.blocks.some((b: any) => b.completed)) return '学習中'
  return '未完了'
}

function getStatusClass(cat: any) {
  const s = getCategoryStatus(cat)
  if (s === '完了') return 'status-complete'
  if (s === '学習中') return 'status-progress'
  return ''
}

function isCategoryComplete(cat: any) {
  return cat.blocks.length > 0 && cat.blocks.every((b: any) => b.completed)
}

function isCategoryCurrent(cat: any) {
  return cat.blocks.some((b: any) => b.completed) && !isCategoryComplete(cat)
}

function getCategoryPercent(cat: any) {
  if (cat.blocks.length === 0) return 0
  return Math.round((cat.blocks.filter((b: any) => b.completed).length / cat.blocks.length) * 100)
}

function goToFirstIncomplete() {
  const cat = currentCourse.value.categories.find(c =>
    c.blocks.some(b => !b.completed)
  )
  if (cat) {
    navigateTo(`/categories/${cat.id}/blocks`)
  }
}

function navigateToBlock(blockId: string) {
  for (const cat of currentCourse.value.categories) {
    if (cat.blocks.some(b => b.id === blockId)) {
      navigateTo(`/categories/${cat.id}/blocks`)
      return
    }
  }
}

const sortedReviews = computed(() =>
  [...reviews.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`
}
</script>
