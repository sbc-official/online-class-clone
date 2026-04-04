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
            <v-btn variant="outlined" style="font-size:13px;color:rgba(0,0,0,0.7)">
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
                <span class="status-chip" style="font-size:11px">{{ getCategoryStatus(cat) }}</span>
              </div>
            </div>
            <span class="date"></span>
            <span class="status-col">
              <span class="status-chip">{{ getCategoryStatus(cat) }}</span>
            </span>
          </div>
        </div>
      </v-col>
    </template>

    <!-- Other Tabs -->
    <v-col v-if="activeTab === '学習計画'">
      <v-card variant="outlined" style="padding:40px;text-align:center;color:rgba(0,0,0,0.4);border-style:dashed">
        <v-icon size="48" color="rgba(0,0,0,0.2)">mdi-calendar-check</v-icon>
        <div style="margin-top:12px;font-size:14px">学習計画ページ</div>
      </v-card>
    </v-col>
    <v-col v-if="activeTab === '感想履歴'">
      <v-card variant="outlined" style="padding:40px;text-align:center;color:rgba(0,0,0,0.4);border-style:dashed">
        <v-icon size="48" color="rgba(0,0,0,0.2)">mdi-message-text</v-icon>
        <div style="margin-top:12px;font-size:14px">感想履歴ページ</div>
      </v-card>
    </v-col>
    <v-col v-if="activeTab === 'マイリスト'">
      <v-card variant="outlined" style="padding:40px;text-align:center;color:rgba(0,0,0,0.4);border-style:dashed">
        <v-icon size="48" color="rgba(0,0,0,0.2)">mdi-bookmark</v-icon>
        <div style="margin-top:12px;font-size:14px">マイリストページ</div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const { currentCourse, progressPercent, completedCategories, completedBlocks, totalBlocks } = useStore()

const tabs = ['コース', '学習計画', '感想履歴', 'マイリスト']
const activeTab = ref('コース')

function getCategoryStatus(cat: any) {
  if (cat.blocks.length === 0) return '未完了'
  if (cat.blocks.every((b: any) => b.completed)) return '完了'
  if (cat.blocks.some((b: any) => b.completed)) return '学習中'
  return '未完了'
}

function goToFirstIncomplete() {
  const cat = currentCourse.value.categories.find(c =>
    c.blocks.some(b => !b.completed)
  )
  if (cat) {
    navigateTo(`/categories/${cat.id}/blocks`)
  }
}
</script>
