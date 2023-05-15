"use client"

import { useState } from "react"
import cn from "classnames"
// React Hook Formというフォームバリデーションライブラリをインポートする
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"
import supabase from "@/lib/supabase-browser"

import Link from "next/link"

const SignUpSchema = z.object({
  // emailのバリデーションルールを定義する
  email: z.string().email("メールアドレスが正しくありません").nonempty("メールを入力してください。"),
  // passwordのバリデーションルールを定義する
  password: z.string().nonempty("パスワードを入力してください。"),
})

const SignUp = () => {
  // AuthProviderからsetView関数を取得する
  const { setView } = useAuth()
  // エラーメッセージの状態を管理する
  const [errorMessage, setErrorMessage] = useState(null)
  // 成功メッセージの状態を管理する
  const [successMessage, setSuccessMessage] = useState(null)

  async function signUp(formData) {
    // supabaseを使ってサインアップ処理を行う
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      // エラーがあればエラーメッセージをセットする
      setErrorMessage(error.message)
    } else {
      // エラーがなければ成功メッセージをセットする
      setSuccessMessage("成功しました！詳細については、メールをご確認ください。")
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // zodResolverを使ってSignUpSchemaに基づいてバリデーションを行う
    resolver: zodResolver(SignUpSchema),
  })

  return (
    <div>
      <h2>ここはアカウントの作成ページです。</h2>
      {/* handleSubmit関数にsignUp関数を渡してフォームの送信処理を行う */}
      <form onSubmit={handleSubmit(signUp)}>
        <label htmlFor="email">メールアドレス</label>
        <input
          // errors.emailがあれば背景色を赤くする
          className={cn("input", errors.email && "bg-red-50")}
          id="email"
          name="email"
          placeholder="masakinihirota@vns.blue"
          type="email"
          // register関数でemailという名前でフォーム要素を登録する
          {...register("email")}
        />
        {/* errors.emailがあればエラーメッセージを表示する */}
        {errors.email ? <div>{errors.email.message}</div> : null}
        <br />
        <label htmlFor="email">パスワード</label>
        <input
          // errors.passwordがあれば背景色を赤くする
          className={cn("input", errors.password && "bg-red-50")}
          id="password"
          name="password"
          type="password"
          // register関数でpasswordという名前でフォーム要素を登録する
          {...register("password")}
        />
        {/* errors.passwordがあればエラーメッセージを表示する */}
        {errors.password ? <div>{errors.password.message}</div> : null}
        <br />
        <button type="submit">アカウントを作成するボタン</button>
      </form>
      {/* errorMessageがあればエラーメッセージを表示する */}
      {errorMessage && <div>{errorMessage}</div>}
      {/* successMessageがあれば成功メッセージを表示する */}
      {successMessage && <div>{successMessage}</div>}
      {/* setView関数でログイン画面に切り替えるボタン */}
      <button type="button" onClick={() => setView(VIEWS.SIGN_IN)}>
        すでにアカウントを作成済みの場合はログインをしてください。
        <br />
        ログイン画面に戻る。
      </button>
      <br />
      {/* ホームページへのリンク */}
      <Link href="/">ホームに戻る。</Link>
    </div>
  )
}

// SignUpコンポーネントをエクスポートする
export default SignUp
