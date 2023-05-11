import { AuthProvider } from "@/components/Auth/AuthProvider"

import createClient from "@/lib/supabase-server"
import Link from "next/link"

import "@/styles/globals.css"

// layoutはキャッシュしないでください。:特に動的なサイトの場合は、revalidateを0に設定してください。
export const revalidate = 0

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const accessToken = session?.access_token || null

  return (
    <html lang="jp">
      <body>
        <main>
          <Link href="/">VNS.BLUE</Link>
          <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
        </main>
      </body>
    </html>
  )
}
