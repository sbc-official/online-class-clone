// ============================================
// Constants
// ============================================
const DEFAULT_COURSE_ID = 'okzM4EDI6MGb'

// Valid credentials (demo)
const VALID_CREDENTIALS = [
  { email: 'test@example.com', password: 'test1234' },
  { email: 'demo@example.com', password: 'demo1234' },
]

// ============================================
// Types
// ============================================
interface Block {
  id: string
  title: string
  type: 'article' | 'video'
  completed: boolean
  hasAiQuestion: boolean
  videoUrl?: string
  content?: string
  duration?: string
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

interface ReviewEntry {
  blockId: string
  blockTitle: string
  categoryName: string
  text: string
  date: string
}

interface BookmarkEntry {
  blockId: string
  blockTitle: string
  categoryName: string
  date: string
}

// ============================================
// Course Data
// ============================================
function createCourseData(): Course {
  return {
    id: DEFAULT_COURSE_ID,
    name: 'コンテンツ販売×AI おさるマーケティング講座 マスタークラス',
    categories: [
      {
        id: 'cat-0', name: '0章：受講前に', order: 0,
        blocks: [
          { id: 'b-0-1', title: '【要確認】グループチャットのご参加', type: 'article', completed: false, hasAiQuestion: false, content: 'おさるマーケ大学のグループチャットに必ず参加してください。\n\n講座のアップデート情報やイベント告知、受講生同士の交流の場として活用しています。\n\n■ 参加方法\n1. 下記のリンクをクリック\n2. 「参加する」ボタンを押す\n3. 自己紹介を投稿する\n\n■ グループチャットのルール\n・実名で参加してください\n・他の受講生への誹謗中傷は禁止です\n・講座内容の外部共有は禁止です\n・質問は「質問」タグをつけて投稿してください' },
          { id: 'b-0-2', title: '【オリエンテーション動画はこちらをご覧ください】', type: 'video', completed: false, hasAiQuestion: true, duration: '45:20' },
          { id: 'b-0-3', title: '2025/09/04 オリエンテーションアーカイブ', type: 'video', completed: false, hasAiQuestion: true, duration: '1:23:15' },
          { id: 'b-0-4', title: '2025/7/15 オリエンテーションアーカイブ', type: 'video', completed: false, hasAiQuestion: true, duration: '1:15:42' },
          { id: 'b-0-5', title: '2025/05/14 オリエンテーション＆初心者質問会アーカイブ', type: 'video', completed: false, hasAiQuestion: true, duration: '1:45:30' },
          { id: 'b-0-6', title: '2025/04/18 オリエンテーションアーカイブ', type: 'video', completed: false, hasAiQuestion: false, duration: '1:12:08' },
          { id: 'b-0-7', title: '2025/12/22 オリエンテーションアーカイブ', type: 'video', completed: false, hasAiQuestion: false, duration: '58:33' },
        ],
      },
      {
        id: 'cat-1', name: '1章：セールスファネル設計', order: 1,
        blocks: [
          { id: 'b-1-1', title: 'セールスファネルとは？全体像を理解する', type: 'video', completed: false, hasAiQuestion: true, duration: '32:15' },
          { id: 'b-1-2', title: 'ファネル設計の3つのポイント', type: 'video', completed: false, hasAiQuestion: false, duration: '28:40' },
          { id: 'b-1-3', title: '実践ワーク：自分のファネルを設計する', type: 'article', completed: false, hasAiQuestion: false, content: '■ ワークの目的\nこのワークでは、あなた自身のビジネスに最適なセールスファネルを設計します。\n\n■ 準備するもの\n・ペンと紙（またはマインドマップツール）\n・自分の商品/サービスの概要\n\n■ ステップ1: ターゲット顧客の明確化\n以下の質問に答えてください：\n- あなたの理想のお客様は誰ですか？\n- その人はどんな悩みを抱えていますか？\n- その悩みが解決されたら、どんな未来が待っていますか？\n\n■ ステップ2: ファネルの流れを描く\n認知 → 興味 → 検討 → 購入 の各段階で、\nお客様にどんな体験を提供するかを書き出してください。\n\n■ ステップ3: 各段階のコンテンツ設計\nそれぞれの段階で必要なコンテンツ（動画、記事、LP等）をリストアップしてください。\n\n■ 提出方法\n完成したファネル設計図を、グループチャットの「ワーク提出」スレッドに投稿してください。\nおさる講師からフィードバックがもらえます。' },
        ],
      },
      {
        id: 'cat-2', name: '2章：商品設計', order: 2,
        blocks: [
          { id: 'b-2-1', title: '売れる商品の作り方', type: 'video', completed: false, hasAiQuestion: true, duration: '41:22' },
          { id: 'b-2-2', title: '価格設定の考え方', type: 'video', completed: false, hasAiQuestion: false, duration: '25:18' },
        ],
      },
      {
        id: 'cat-3', name: '3章：集客', order: 3,
        blocks: [
          { id: 'b-3-1', title: '集客の全体像', type: 'video', completed: false, hasAiQuestion: true, duration: '38:55' },
          { id: 'b-3-2', title: 'オーガニック集客 vs 広告集客', type: 'video', completed: false, hasAiQuestion: false, duration: '22:10' },
          { id: 'b-3-3', title: '集客チャネルの選び方', type: 'article', completed: false, hasAiQuestion: false, content: '■ 集客チャネルの選び方\n\nどのSNSを使うか迷っていませんか？\n答えはシンプルです。「お客様がいる場所」で発信することです。\n\n■ 各プラットフォームの特性\n\n【YouTube】\n・長尺コンテンツで信頼構築\n・検索流入が見込める（ストック型）\n・教育系・ノウハウ系に強い\n\n【Instagram】\n・ビジュアルで世界観を伝える\n・ストーリーズで日常発信\n・リール（ショート動画）で新規リーチ\n\n【X（旧Twitter）】\n・テキストベースで思考を共有\n・拡散力が最も高い\n・リアルタイム性が強み\n\n■ おすすめの組み合わせ\n① メイン: YouTube + サブ: Instagram\n② メイン: Instagram + サブ: X\n③ メイン: YouTube + サブ: X\n\nまずは1つに集中し、月10本以上のコンテンツを出すことを目標にしましょう。' },
        ],
      },
      {
        id: 'cat-4', name: '4章：YouTube', order: 4,
        blocks: [
          { id: 'b-4-1', title: 'YouTube戦略の基本', type: 'video', completed: false, hasAiQuestion: true, duration: '52:30' },
          { id: 'b-4-2', title: 'サムネイル&タイトルの作り方', type: 'video', completed: false, hasAiQuestion: true, duration: '35:12' },
          { id: 'b-4-3', title: '台本の書き方テンプレート', type: 'article', completed: false, hasAiQuestion: false, content: '■ YouTube台本テンプレート\n\n【オープニング（0:00-0:30）】\n・フック: 視聴者の悩みに共感する一言\n・結論の予告: この動画で得られるもの\n・自己紹介: 3秒で完結\n\n【本編（0:30-8:00）】\n・ポイント1: 〇〇\n  - 具体例\n  - 実践方法\n・ポイント2: 〇〇\n  - 具体例\n  - 実践方法\n・ポイント3: 〇〇\n  - 具体例\n  - 実践方法\n\n【まとめ（8:00-9:00）】\n・3つのポイントを振り返り\n・次のアクション提示\n・CTA（チャンネル登録・LINE登録）\n\n■ ポイント\n- 1文は短く（20文字以内）\n- 専門用語は必ず言い換える\n- 「例えば」を多用する' },
        ],
      },
      { id: 'cat-5', name: '5章：X（旧Twitter）& Threads ※最新動画有り', order: 5, blocks: [
        { id: 'b-5-1', title: 'X運用の基本戦略', type: 'video', completed: false, hasAiQuestion: false, duration: '29:45' },
        { id: 'b-5-2', title: 'バズるポストの型', type: 'video', completed: false, hasAiQuestion: true, duration: '33:20' },
      ] },
      { id: 'cat-6', name: '6章：Instagram & ショート動画', order: 6, blocks: [
        { id: 'b-6-1', title: 'Instagram集客の全体像', type: 'video', completed: false, hasAiQuestion: false, duration: '44:10' },
        { id: 'b-6-2', title: 'リール動画の作り方', type: 'video', completed: false, hasAiQuestion: true, duration: '38:25' },
      ] },
      { id: 'cat-7', name: '7章：LINE/メルマガを活用したローンチシステムの構築', order: 7, blocks: [
        { id: 'b-7-1', title: 'ローンチシステム構築', type: 'video', completed: false, hasAiQuestion: true, duration: '55:40' },
        { id: 'b-7-2', title: 'ステップ配信の設計', type: 'video', completed: false, hasAiQuestion: false, duration: '42:18' },
      ] },
      { id: 'cat-8', name: '8章：ローンチ動画', order: 8, blocks: [
        { id: 'b-8-1', title: 'ローンチ動画の作り方', type: 'video', completed: false, hasAiQuestion: false, duration: '48:30' },
      ] },
      { id: 'cat-9', name: '9章：セールス', order: 9, blocks: [
        { id: 'b-9-1', title: 'セールスの基本', type: 'video', completed: false, hasAiQuestion: true, duration: '37:55' },
        { id: 'b-9-2', title: 'セールスレターの書き方', type: 'article', completed: false, hasAiQuestion: false, content: '■ セールスレター基本構成\n\n【ヘッドライン】\n読者の最大の悩みを言語化し、解決の希望を示す。\n例: 「SNSフォロワー0人から、3ヶ月で月収100万円を達成した方法」\n\n【ストーリー】\n共感 → 転機 → 成功 の流れで自分の体験を語る。\n\n【オファー】\n商品の内容を具体的に提示。箇条書きで分かりやすく。\n\n【ベネフィット】\n「この商品を手にすることで、あなたは〇〇できるようになります」\n\n【証拠】\n実績・お客様の声・データを提示。\n\n【保証】\n返金保証など、リスクリバーサルを提示。\n\n【CTA（行動喚起）】\n「今すぐ申し込む」ボタンを設置。期限・限定性を付与。' },
      ] },
      { id: 'cat-10', name: '10章：外注化', order: 10, blocks: [
        { id: 'b-10-1', title: '外注化の進め方', type: 'video', completed: false, hasAiQuestion: false, duration: '33:40' },
      ] },
      { id: 'cat-11', name: '11章：購入者特典', order: 11, blocks: [
        { id: 'b-11-1', title: '購入者特典の設計', type: 'article', completed: false, hasAiQuestion: false, content: '■ 購入者特典の設計ガイド\n\n特典は「商品の価値を上げるもの」であるべきです。\n安易なPDF量産ではなく、本当に役立つ特典を設計しましょう。\n\n■ 特典の種類\n1. テンプレート系: すぐ使える台本・構成案\n2. チェックリスト系: 手順を見える化\n3. ケーススタディ系: 実例解説\n4. ツール/リソース系: 便利ツールまとめ\n5. コミュニティ系: 限定グループへの招待\n\n■ 特典設計のコツ\n- 本編で学んだことをすぐ実践できるものにする\n- 「これだけで元が取れる」と思わせる価値にする\n- 数を増やすより質を高める' },
      ] },
      { id: 'cat-12', name: '【追加】UTAGE基本操作', order: 12, blocks: [{ id: 'b-12-1', title: 'UTAGE操作ガイド', type: 'video', completed: false, hasAiQuestion: false, duration: '1:05:20' }] },
      { id: 'cat-13', name: '【追加】Meta広告スターティングマニュアル', order: 13, blocks: [{ id: 'b-13-1', title: 'Meta広告の始め方', type: 'video', completed: false, hasAiQuestion: false, duration: '48:15' }] },
      { id: 'cat-14', name: '【おさるによる】LIVEセミナーアーカイブ', order: 14, blocks: [
        { id: 'b-14-1', title: 'LIVEセミナー vol.1', type: 'video', completed: false, hasAiQuestion: false, duration: '1:32:45' },
        { id: 'b-14-2', title: 'LIVEセミナー vol.2', type: 'video', completed: false, hasAiQuestion: false, duration: '1:28:10' },
      ] },
      { id: 'cat-15', name: '【おさるマーケ大学講師による】LIVEセミナーアーカイブ', order: 15, blocks: [
        { id: 'b-15-1', title: '講師セミナー vol.1', type: 'video', completed: false, hasAiQuestion: false, duration: '1:15:30' },
      ] },
      { id: 'cat-16', name: '【豪華外部講師陣による】LIVEセミナーアーカイブ', order: 16, blocks: [
        { id: 'b-16-1', title: '外部講師セミナー vol.1', type: 'video', completed: false, hasAiQuestion: false, duration: '1:45:20' },
      ] },
      { id: 'cat-17', name: '【聞き流し用】LIVEセミナーアーカイブ', order: 17, blocks: [
        { id: 'b-17-1', title: '聞き流しセミナー vol.1', type: 'video', completed: false, hasAiQuestion: false, duration: '2:10:05' },
      ] },
      { id: 'cat-18', name: '質問回答会', order: 18, blocks: [
        { id: 'b-18-1', title: '質問回答会 vol.1', type: 'video', completed: false, hasAiQuestion: false, duration: '1:22:40' },
      ] },
      { id: 'cat-19', name: '【一撃で3億着金】2023年10月おさるローンチ 全解説/全資料配布', order: 19, blocks: [
        { id: 'b-19-1', title: 'ローンチ全解説', type: 'video', completed: false, hasAiQuestion: false, duration: '2:35:10' },
      ] },
      { id: 'cat-20', name: '合宿/外部イベント講義まとめ', order: 20, blocks: [
        { id: 'b-20-1', title: '合宿講義 vol.1', type: 'video', completed: false, hasAiQuestion: false, duration: '1:48:30' },
      ] },
      { id: 'cat-21', name: 'グループコンサル アーカイブ', order: 21, blocks: [
        { id: 'b-21-1', title: 'グルコン vol.1', type: 'video', completed: false, hasAiQuestion: false, duration: '1:55:15' },
      ] },
    ],
  }
}

function createSBCCourseData(): Course {
  return {
    id: 'sbc-map',
    name: 'SBCの地図＆歩き方',
    categories: [
      {
        id: 'sbc-cat-0', name: 'はじめに', order: 0,
        blocks: [
          { id: 'sbc-0-1', title: 'SBCへようこそ', type: 'video', completed: false, hasAiQuestion: false, duration: '12:30' },
          { id: 'sbc-0-2', title: 'コミュニティの活用方法', type: 'article', completed: false, hasAiQuestion: false, content: '■ SBCコミュニティの活用方法\n\nSBC（Sustainable Business Community）へようこそ。\nこのガイドでは、コミュニティを最大限活用する方法をお伝えします。\n\n■ 3つの活用ポイント\n1. 月例セミナーへの参加\n2. メンバー同士の交流\n3. 個別相談の活用\n\nまずは自己紹介から始めましょう。' },
        ],
      },
      {
        id: 'sbc-cat-1', name: 'ビジネスの基盤づくり', order: 1,
        blocks: [
          { id: 'sbc-1-1', title: '自分の強みを見つける', type: 'video', completed: false, hasAiQuestion: true, duration: '35:20' },
          { id: 'sbc-1-2', title: 'ビジネスモデルの選び方', type: 'video', completed: false, hasAiQuestion: false, duration: '28:45' },
        ],
      },
      {
        id: 'sbc-cat-2', name: '集客の仕組み', order: 2,
        blocks: [
          { id: 'sbc-2-1', title: 'SNS発信の基本', type: 'video', completed: false, hasAiQuestion: false, duration: '42:10' },
        ],
      },
    ],
  }
}

function createGroupConCourseData(): Course {
  return {
    id: 'groupcon',
    name: 'グルコンコース',
    categories: [
      {
        id: 'gc-cat-0', name: 'グループコンサル概要', order: 0,
        blocks: [
          { id: 'gc-0-1', title: 'グルコンコースの進め方', type: 'video', completed: false, hasAiQuestion: false, duration: '15:40' },
          { id: 'gc-0-2', title: '参加ルール＆スケジュール', type: 'article', completed: false, hasAiQuestion: false, content: '■ グルコンコース 参加ルール\n\n【開催スケジュール】\n・毎月第2・第4水曜日 20:00-22:00\n・Zoomにて開催\n・アーカイブは翌日配信\n\n【参加方法】\n・開催日の前日までに質問を提出\n・当日はカメラONで参加推奨\n・途中参加・退出OK\n\n【質問の出し方】\n・具体的に書く（「集客がうまくいかない」→「Instagramリールの再生数が100以下で伸びない」）\n・現状と目標を明記\n・すでに試したことを書く' },
        ],
      },
      {
        id: 'gc-cat-1', name: 'アーカイブ', order: 1,
        blocks: [
          { id: 'gc-1-1', title: '第1回 グルコンアーカイブ', type: 'video', completed: false, hasAiQuestion: false, duration: '1:55:20' },
          { id: 'gc-1-2', title: '第2回 グルコンアーカイブ', type: 'video', completed: false, hasAiQuestion: false, duration: '2:05:10' },
        ],
      },
    ],
  }
}

// ============================================
// LocalStorage Helpers
// ============================================
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key: string, value: any) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch { /* quota exceeded, ignore */ }
}

// ============================================
// Store
// ============================================
export const useStore = () => {
  // --- User ---
  const user = useState<User | null>('user', () => null)
  const isLoggedIn = computed(() => !!user.value)

  // --- Courses ---
  const allCourses = useState<Course[]>('allCourses', () => [
    createCourseData(),
    createSBCCourseData(),
    createGroupConCourseData(),
  ])
  const currentCourseId = useState<string>('currentCourseId', () => DEFAULT_COURSE_ID)
  const currentCourse = computed(() =>
    allCourses.value.find(c => c.id === currentCourseId.value) || allCourses.value[0]
  )

  const organizations = computed<Organization[]>(() => [
    {
      name: 'おさるマーケ大学',
      hasNew: false,
      courses: [allCourses.value[0]],
    },
    {
      name: '株式会社変わらない勇気',
      hasNew: false,
      courses: [allCourses.value[1], allCourses.value[2]],
    },
  ])

  // --- Snackbar ---
  const snackbar = useState('snackbar', () => ({
    show: false,
    text: '',
    color: 'success' as string,
  }))

  // --- Reviews & Bookmarks ---
  const reviews = useState<ReviewEntry[]>('reviews', () => [])
  const bookmarks = useState<BookmarkEntry[]>('bookmarks', () => [])

  // --- AI Chat ---
  const aiChatOpen = useState('aiChatOpen', () => false)
  const aiChatBlockId = useState<string | null>('aiChatBlockId', () => null)

  // --- Article Viewer ---
  const articleViewerOpen = useState('articleViewerOpen', () => false)
  const articleViewerBlock = useState<Block | null>('articleViewerBlock', () => null)

  // --- Progress Detail ---
  const progressDetailOpen = useState('progressDetailOpen', () => false)

  // ============================================
  // Hydrate from localStorage
  // ============================================
  if (typeof window !== 'undefined') {
    const savedUser = loadFromStorage<User | null>('oc_user', null)
    if (savedUser && !user.value) {
      user.value = savedUser
    }

    const savedProgress = loadFromStorage<Record<string, boolean>>('oc_progress', {})
    if (Object.keys(savedProgress).length > 0) {
      for (const course of allCourses.value) {
        for (const cat of course.categories) {
          for (const block of cat.blocks) {
            if (savedProgress[block.id]) {
              block.completed = true
            }
          }
        }
      }
    }

    const savedReviews = loadFromStorage<ReviewEntry[]>('oc_reviews', [])
    if (savedReviews.length > 0 && reviews.value.length === 0) {
      reviews.value = savedReviews
    }

    const savedBookmarks = loadFromStorage<BookmarkEntry[]>('oc_bookmarks', [])
    if (savedBookmarks.length > 0 && bookmarks.value.length === 0) {
      bookmarks.value = savedBookmarks
    }

    const savedCourseId = loadFromStorage<string>('oc_courseId', DEFAULT_COURSE_ID)
    if (savedCourseId !== DEFAULT_COURSE_ID) {
      currentCourseId.value = savedCourseId
    }
  }

  // ============================================
  // Persistence watchers
  // ============================================
  function persistProgress() {
    const progress: Record<string, boolean> = {}
    for (const course of allCourses.value) {
      for (const cat of course.categories) {
        for (const block of cat.blocks) {
          if (block.completed) {
            progress[block.id] = true
          }
        }
      }
    }
    saveToStorage('oc_progress', progress)
  }

  // ============================================
  // Auth
  // ============================================
  function login(email: string, password: string): { success: boolean; error?: string } {
    const found = VALID_CREDENTIALS.find(
      c => c.email === email.toLowerCase().trim() && c.password === password
    )
    if (!found) {
      return { success: false, error: 'メールアドレスまたはパスワードが正しくありません' }
    }
    const u: User = {
      email: found.email,
      name: found.email.split('@')[0],
      initial: found.email[0].toUpperCase(),
    }
    user.value = u
    saveToStorage('oc_user', u)
    showSnackbar('ログインしました！', 'success')
    return { success: true }
  }

  function logout() {
    user.value = null
    saveToStorage('oc_user', null)
    showSnackbar('ログアウトしました', 'info')
  }

  // ============================================
  // Course switching
  // ============================================
  function switchCourse(courseId: string) {
    currentCourseId.value = courseId
    saveToStorage('oc_courseId', courseId)
  }

  // ============================================
  // Block operations
  // ============================================
  function toggleBlockComplete(blockId: string) {
    for (const course of allCourses.value) {
      for (const cat of course.categories) {
        const block = cat.blocks.find(b => b.id === blockId)
        if (block) {
          block.completed = !block.completed
          persistProgress()
          return
        }
      }
    }
  }

  // ============================================
  // Reviews
  // ============================================
  function addReview(blockId: string, blockTitle: string, categoryName: string, text: string) {
    reviews.value.push({
      blockId,
      blockTitle,
      categoryName,
      text,
      date: new Date().toISOString(),
    })
    saveToStorage('oc_reviews', reviews.value)
  }

  // ============================================
  // Bookmarks
  // ============================================
  function toggleBookmark(blockId: string, blockTitle: string, categoryName: string) {
    const idx = bookmarks.value.findIndex(b => b.blockId === blockId)
    if (idx >= 0) {
      bookmarks.value.splice(idx, 1)
    } else {
      bookmarks.value.push({ blockId, blockTitle, categoryName, date: new Date().toISOString() })
    }
    saveToStorage('oc_bookmarks', bookmarks.value)
  }

  function isBookmarked(blockId: string) {
    return bookmarks.value.some(b => b.blockId === blockId)
  }

  // ============================================
  // Article Viewer
  // ============================================
  function openArticle(block: Block) {
    articleViewerBlock.value = block
    articleViewerOpen.value = true
  }

  function closeArticle() {
    articleViewerOpen.value = false
    articleViewerBlock.value = null
  }

  // ============================================
  // AI Chat
  // ============================================
  function openAiChat(blockId: string) {
    aiChatBlockId.value = blockId
    aiChatOpen.value = true
  }

  function closeAiChat() {
    aiChatOpen.value = false
    aiChatBlockId.value = null
  }

  // ============================================
  // Snackbar
  // ============================================
  function showSnackbar(text: string, color: string = 'success') {
    snackbar.value = { show: true, text, color }
    setTimeout(() => { snackbar.value.show = false }, 3000)
  }

  // ============================================
  // Computed: Progress
  // ============================================
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
    // Constants
    DEFAULT_COURSE_ID,
    // User
    user,
    isLoggedIn,
    login,
    logout,
    // Courses
    organizations,
    allCourses,
    currentCourse,
    currentCourseId,
    switchCourse,
    // Snackbar
    snackbar,
    showSnackbar,
    // Blocks
    toggleBlockComplete,
    // Reviews
    reviews,
    addReview,
    // Bookmarks
    bookmarks,
    toggleBookmark,
    isBookmarked,
    // Article Viewer
    articleViewerOpen,
    articleViewerBlock,
    openArticle,
    closeArticle,
    // AI Chat
    aiChatOpen,
    aiChatBlockId,
    openAiChat,
    closeAiChat,
    // Progress Detail
    progressDetailOpen,
    // Progress computed
    totalBlocks,
    completedBlocks,
    completedCategories,
    progressPercent,
  }
}
