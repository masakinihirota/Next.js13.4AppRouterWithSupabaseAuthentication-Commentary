"use client"

import Link from "next/link"

import Auth from "@/components/Auth"
import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"

export default function Home() {
  const { initial, user, view, signOut } = useAuth()

  if (initial) {
    return <div>ローディング中です...</div>
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />
  }

  if (user) {
    return (
      <div>
        <h2>あなたの情報ページです。</h2>
        <code>
          ユーザーの役割: <strong> {user.role}</strong>
        </code>
        <br />
        <Link href="/profile">自分のプロフィールを見る。</Link>
        <br />
        <button type="button" onClick={signOut}>
          ログアウトする。
        </button>
        <br />
        <Link href="/">ホームに戻る。</Link>
      </div>
    )
  }

  return <Auth view={view} />
}
