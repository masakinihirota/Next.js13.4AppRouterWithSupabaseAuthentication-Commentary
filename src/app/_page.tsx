"use client"
import Link from "next/link"
import Auth from "@/components/Auth"
import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"

export default function Home() {
  const { initial, user, view, signOut } = useAuth()

  if (initial) {
    return <div>Loading...</div>
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />
  }

  return (
    <div>
      {/* ユーザー認証済み */}
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
        // ユーザー認証されていない
        <Link href="/authButton">
          <button>認証ボタン</button>
        </Link>
      )}
    </div>
  )
}
