"use client"

// Reactのフックやコンテキストなどをインポートする
import { createContext, useContext, useEffect, useMemo, useState } from "react"
// Next.jsのルーターをインポートする
import { useRouter } from "next/navigation"

// Supabaseのブラウザ用ライブラリをインポートする
import supabase from "@/lib/supabase-browser"

// Supabaseの認証イベントの種類を定数として定義する
export const EVENTS = {
  PASSWORD_RECOVERY: "PASSWORD_RECOVERY",
  SIGNED_OUT: "SIGNED_OUT",
  USER_UPDATED: "USER_UPDATED",
}

// 認証画面の種類を定数として定義する
export const VIEWS = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
}

// 認証情報を保持するコンテキストを作成する
export const AuthContext = createContext()

// 認証情報を提供するコンポーネントを定義する
export const AuthProvider = (props) => {
  // 初期状態かどうかを表すステートを定義する
  const [initial, setInitial] = useState(true)
  // セッション情報を保持するステートを定義する
  const [session, setSession] = useState(null)
  // ユーザー情報を保持するステートを定義する
  const [user, setUser] = useState(null)
  // 認証画面の種類を保持するステートを定義する
  const [view, setView] = useState(VIEWS.SIGN_IN)
  // ルーターを取得する
  const router = useRouter()
  // アクセストークンとその他のプロパティを分割代入で取得する
  const { accessToken, ...rest } = props

  // コンポーネントがマウントされたときに実行される副作用関数を定義する
  useEffect(() => {
    // 現在有効なセッション情報を取得する非同期関数を定義する
    async function getActiveSession() {
      // SupabaseのAPIにリクエストしてセッション情報を取得する
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession()
      // セッション情報とユーザー情報をステートにセットする
      setSession(activeSession)
      setUser(activeSession?.user ?? null)
      // 初期状態でないことをステートにセットする
      setInitial(false)
    }
    // 非同期関数を実行する
    getActiveSession()

    // Supabaseの認証状態が変化したときに実行されるリスナー関数を登録し、そのサブスクリプションオブジェクトを取得する
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      // 現在のアクセストークンと異なる場合は、ページをリフレッシュする
      if (currentSession?.access_token !== accessToken) {
        router.refresh()
      }
      // セッション情報とユーザー情報をステートにセットする
      setSession(currentSession)
      setUser(currentSession?.user ?? null)

      // 認証イベントの種類に応じて、認証画面の種類をステートにセットする
      switch (event) {
        case EVENTS.PASSWORD_RECOVERY:
          setView(VIEWS.UPDATE_PASSWORD)
          break
        case EVENTS.SIGNED_OUT:
        case EVENTS.USER_UPDATED:
          setView(VIEWS.SIGN_IN)
          break
        default:
      }
    })

    // コンポーネントがアンマウントされたときに、リスナー関数を解除する
    return () => {
      authListener?.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // コンテキストの値をメモ化する
  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      view,
      setView,
      // SupabaseのAPIを使ってサインアウトする関数
      signOut: () => supabase.auth.signOut(),
    }
  }, [initial, session, user, view])

  // コンテキストプロバイダーを返す
  return <AuthContext.Provider value={value} {...rest} />
}

// 認証情報を取得するカスタムフックを定義する
export const useAuth = () => {
  // コンテキストから認証情報を取得する
  const context = useContext(AuthContext)
  // コンテキストが未定義の場合は、エラーを投げる
  if (context === undefined) {
    throw new Error("useAuthはAuthProviderの中で使用する必要があります。")
  }
  // 認証情報を返す
  return context
}
