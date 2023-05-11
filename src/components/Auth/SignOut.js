"use client"

import { useAuth } from "@/components/Auth/AuthProvider"

export default function SignOut() {
  const { signOut } = useAuth()

  async function handleSignOut() {
    const { error } = await signOut()

    if (error) {
      console.error("ログアウトに失敗しました 次のコードをお知らせください。:", error)
    }
  }

  return (
    <button type="button" onClick={handleSignOut}>
      ログアウトする
    </button>
  )
}
