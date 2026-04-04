interface Block {
  id: string
  title: string
  type: 'article' | 'video'
  completed: boolean
  hasAiQuestion: boolean
  videoUrl?: string
  content?: string
}

interface Category {
  id: string
  name: string
  order: number
  blocks: Block[]
}

interface Course {
  id: string
  name: string
  categories: Category[]
}

interface Organization {
  name: string
  hasNew: boolean
  courses: Course[]
}

interface User {
  email: string
  name: string
  initial: string
}

const defaultUser: User = {
  email: 'test@example.com',
  name: 'テストユーザー',
  initial: 'T',
}

const courseData: Course = {
  id: 'okzM4EDI6MGb',
  name: 'コンテンツ販売×AI おさるマーケティング講座 マスタークラス',
  categories: [
    {
      id: 'cat-0', name: '0章：受講前に', order: 0,
      blocks: [
        { id: 'b-0-1', title: '【要確認】グループチャットのご参加', type: 'article', completed: false, hasAiQuestion: false },
        { id: 'b-0-2', title: '【オリエンテーション動画はこちらをご覧ください】', type: 'video', completed: false, hasAiQuestion: true },
        { id: 'b-0-3', title: '2025/09/04 オリエンテーションアーカイブ', type: 'video', completed: false, hasAiQuestion: true },
        { id: 'b-0-4', title: '2025/7/15 オリエンテーションアーカイブ', type: 'video', completed: false, hasAiQuestion: true },
        { id: 'b-0-5', title: '2025/05/14 オリエンテーション＆初心者質問会アーカイブ', type: 'video', completed: false, hasAiQuestion: true },
        { id: 'b-0-6', title: '2025/04/18 オリエンテーションアーカイブ', type: 'video', completed: false, hasAiQuestion: false },
        { id: 'b-0-7', title: '2025/12/22 オリエンテーションアーカイブ', type: 'video', completed: false, hasAiQuestion: false },
      ],
    },
    {
      id: 'cat-1', name: '1章：セールスファネル設計', order: 1,
      blocks: [
        { id: 'b-1-1', title: 'セールスファネルとは？全体像を理解する', type: 'video', completed: false, hasAiQuestion: true },
        { id: 'b-1-2', title: 'ファネル設計の3つのポイント', type: 'video', completed: false, hasAiQuestion: false },
        { id: 'b-1-3', title: '実践ワーク：自分のファネルを設計する', type: 'article', completed: false, hasAiQuestion: false },
      ],
    },
    {
      id: 'cat-2', name: '2章：商品設計', order: 2,
      blocks: [
        { id: 'b-2-1', title: '売れる商品の作り方', type: 'video', completed: false, hasAiQuestion: true },
        { id: 'b-2-2', title: '価格設定の考え方', type: 'video', completed: false, hasAiQuestion: false },
      ],
    },
    { id: 'cat-3', name: '3章：集客', order: 3, blocks: [{ id: 'b-3-1', title: '集客の全体像', type: 'video', completed: false, hasAiQuestion: true }] },
    { id: 'cat-4', name: '4章：YouTube', order: 4, blocks: [{ id: 'b-4-1', title: 'YouTube戦略の基本', type: 'video', completed: false, hasAiQuestion: true }] },
    { id: 'cat-5', name: '5章：X（旧Twitter）& Threads ※最新動画有り', order: 5, blocks: [{ id: 'b-5-1', title: 'X運用の基本戦略', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-6', name: '6章：Instagram & ショート動画', order: 6, blocks: [{ id: 'b-6-1', title: 'Instagram集客の全体像', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-7', name: '7章：LINE/メルマガを活用したローンチシステムの構築', order: 7, blocks: [{ id: 'b-7-1', title: 'ローンチシステム構築', type: 'video', completed: false, hasAiQuestion: true }] },
    { id: 'cat-8', name: '8章：ローンチ動画', order: 8, blocks: [{ id: 'b-8-1', title: 'ローンチ動画の作り方', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-9', name: '9章：セールス', order: 9, blocks: [{ id: 'b-9-1', title: 'セールスの基本', type: 'video', completed: false, hasAiQuestion: true }] },
    { id: 'cat-10', name: '10章：外注化', order: 10, blocks: [{ id: 'b-10-1', title: '外注化の進め方', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-11', name: '11章：購入者特典', order: 11, blocks: [{ id: 'b-11-1', title: '購入者特典の設計', type: 'article', completed: false, hasAiQuestion: false }] },
    { id: 'cat-12', name: '【追加】UTAGE基本操作', order: 12, blocks: [{ id: 'b-12-1', title: 'UTAGE操作ガイド', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-13', name: '【追加】Meta広告スターティングマニュアル', order: 13, blocks: [{ id: 'b-13-1', title: 'Meta広告の始め方', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-14', name: '【おさるによる】LIVEセミナーアーカイブ', order: 14, blocks: [{ id: 'b-14-1', title: 'LIVEセミナー vol.1', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-15', name: '【おさるマーケ大学講師による】LIVEセミナーアーカイブ', order: 15, blocks: [{ id: 'b-15-1', title: '講師セミナー vol.1', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-16', name: '【豪華外部講師陣による】LIVEセミナーアーカイブ', order: 16, blocks: [{ id: 'b-16-1', title: '外部講師セミナー vol.1', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-17', name: '【聞き流し用】LIVEセミナーアーカイブ', order: 17, blocks: [{ id: 'b-17-1', title: '聞き流しセミナー vol.1', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-18', name: '質問回答会', order: 18, blocks: [{ id: 'b-18-1', title: '質問回答会 vol.1', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-19', name: '【一撃で3億着金】2023年10月おさるローンチ 全解説/全資料配布', order: 19, blocks: [{ id: 'b-19-1', title: 'ローンチ全解説', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-20', name: '合宿/外部イベント講義まとめ', order: 20, blocks: [{ id: 'b-20-1', title: '合宿講義 vol.1', type: 'video', completed: false, hasAiQuestion: false }] },
    { id: 'cat-21', name: 'グループコンサル アーカイブ', order: 21, blocks: [{ id: 'b-21-1', title: 'グルコン vol.1', type: 'video', completed: false, hasAiQuestion: false }] },
  ],
}

const organizations: Organization[] = [
  {
    name: 'おさるマーケ大学',
    hasNew: false,
    courses: [courseData],
  },
  {
    name: '株式会社変わらない勇気',
    hasNew: false,
    courses: [
      { id: 'sbc-map', name: 'SBCの地図＆歩き方', categories: [] },
      { id: 'groupcon', name: 'グルコンコース', categories: [] },
    ],
  },
]

export const useStore = () => {
  const user = useState<User | null>('user', () => null)
  const isLoggedIn = computed(() => !!user.value)
  const currentCourse = useState<Course>('currentCourse', () => courseData)
  const snackbar = useState('snackbar', () => ({
    show: false,
    text: '',
    color: 'success' as string,
  }))

  function login(email: string, _password: string) {
    user.value = {
      email,
      name: email.split('@')[0],
      initial: email[0].toUpperCase(),
    }
    showSnackbar('ログインしました！', 'success')
    return true
  }

  function logout() {
    user.value = null
  }

  function toggleBlockComplete(blockId: string) {
    for (const cat of currentCourse.value.categories) {
      const block = cat.blocks.find(b => b.id === blockId)
      if (block) {
        block.completed = !block.completed
        return
      }
    }
  }

  function showSnackbar(text: string, color: string = 'success') {
    snackbar.value = { show: true, text, color }
    setTimeout(() => { snackbar.value.show = false }, 3000)
  }

  const totalBlocks = computed(() =>
    currentCourse.value.categories.reduce((sum, cat) => sum + cat.blocks.length, 0)
  )

  const completedBlocks = computed(() =>
    currentCourse.value.categories.reduce(
      (sum, cat) => sum + cat.blocks.filter(b => b.completed).length, 0
    )
  )

  const completedCategories = computed(() =>
    currentCourse.value.categories.filter(
      cat => cat.blocks.length > 0 && cat.blocks.every(b => b.completed)
    ).length
  )

  const progressPercent = computed(() =>
    totalBlocks.value > 0
      ? Math.round((completedBlocks.value / totalBlocks.value) * 100)
      : 0
  )

  return {
    user,
    isLoggedIn,
    organizations,
    currentCourse,
    snackbar,
    login,
    logout,
    toggleBlockComplete,
    showSnackbar,
    totalBlocks,
    completedBlocks,
    completedCategories,
    progressPercent,
  }
}
