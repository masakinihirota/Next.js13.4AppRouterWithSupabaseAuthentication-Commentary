"use client"
import Link from "next/link"
import Auth from "@/components/Auth"
import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"

// src/pages/index.tsx
export default function Home() {
  // 1. ユーザーの認証状態を取得する
  const { initial, user, view, signOut } = useAuth()

  // 2. ページの最初のレンダーが完了するまで、
  //    ユーザーの認証状態を待ちます
  if (initial) {
    return <div>Loading...</div>
  }

  // 3. ユーザーがパスワードを更新する必要がある場合は、
  //    パスワード更新フォームを表示します
  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />
  }

  // 4. それ以外の場合は、ユーザーに対して適切なコンテンツを表示します
  return (
    <div>
      {user ? (
        <>
          <Link href="/authButton">
            <button>認証ボタン</button>
          </Link>
          <h3>
            ユーザーの役割: <strong>{user.role}</strong>
          </h3>
          <Link href="/profile">自分のプロフィールを見る</Link>
          <br />
          <Link href="/">
            <button type="button" onClick={signOut}>
              ログアウトする
            </button>
          </Link>
        </>
      ) : (
        <Link href="/authButton">
          <button>認証ボタン</button>
        </Link>
      )}
    </div>
  )
}
