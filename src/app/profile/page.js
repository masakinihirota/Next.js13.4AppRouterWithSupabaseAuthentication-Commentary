import Link from "next/link"
import { redirect } from "next/navigation"

import SignOut from "@/components/Auth/SignOut"
import createClient from "@/lib/supabase-server"

export default async function Profile() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  return (
    <div>
      <h2>あなたのメールアドレス</h2>
      <code>{user.email}</code>
      <div>最後にログインした日時</div>
      日本時間: <code>{new Date(user.last_sign_in_at).toLocaleString("ja-JP")}</code>
      <br />
      <SignOut />
      <br />
      <Link href="/">ホームに戻る。</Link>
    </div>
  )
}
