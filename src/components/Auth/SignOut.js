// クライアントコンポーネントを使うためのディレクティブ
"use client"

// AuthProviderというコンポーネントからuseAuthというカスタムフックをインポート
import { useAuth } from "@/components/Auth/AuthProvider"

// SignOutというコンポーネントを定義
export default function SignOut() {
  // useAuthからsignOutという関数を取得
  const { signOut } = useAuth()

  // handleSignOutという非同期関数を定義
  async function handleSignOut() {
    // signOut関数を実行して結果を受け取る
    const { error } = await signOut()

    // エラーがあればコンソールに出力する
    if (error) {
      console.error("ログアウトに失敗しました 次のコードをお知らせください。:", error)
    }
  }

  // ボタンを表示する
  return (
    // ボタンがクリックされたらhandleSignOut関数を呼び出す
    <button type="button" onClick={handleSignOut}>
      ログアウトする
    </button>
  )
}
