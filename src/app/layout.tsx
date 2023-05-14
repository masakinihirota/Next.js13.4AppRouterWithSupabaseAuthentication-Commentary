import { AuthProvider } from "@/components/Auth/AuthProvider"

import createClient from "@/lib/supabase-server"
import Link from "next/link"

import "@/styles/globals.css"

// layoutはキャッシュしないでください。:特に動的なサイトの場合は、revalidateを0に設定してください。
export const revalidate = 0

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // サーバー側でのみ実行されるコード
  // クライアントを作る
  const supabase = createClient()

  // セッションを取得する
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // セッションがあるのなら、そこからアクセストークンを取得する
  const accessToken = session?.access_token || null

  return (
    <html lang="jp">
      <body>
        <main>
          {/* TOPページに戻るようのボタン */}
          {/* VNS.BLUEは開発中のサイト名 */}
          {/* 各自自由にサイト名を書き換えてください */}
          <Link href="/">VNS.BLUE</Link>
          {/* AuthProvider コンポーネントは、accessToken 変数を使用して、レンダリングされたすべてのコンテンツに認証を適用します。 */}
          <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
        </main>
      </body>
    </html>
  )
}
