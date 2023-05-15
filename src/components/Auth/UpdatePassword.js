"use client"

// reactのuseStateフックをインポートする
import { useState } from "react"
// cnというクラス名のヘルパー関数をインポートする
import cn from "classnames"
// react-hook-formというフォーム管理ライブラリをインポートする
import { useForm } from "react-hook-form"
// zodというスキーマ検証ライブラリをインポートする
import { z } from "zod"
// zodResolverというreact-hook-formとzodを連携させる関数をインポートする
import { zodResolver } from "@hookform/resolvers/zod"

// supabaseというバックエンドサービスをインポートする
import supabase from "@/lib/supabase-browser"

// パスワードの更新に必要なスキーマを定義する
const UpdatePasswordSchema = z.object({
  // passwordは空でない文字列であることを要求する
  password: z.string().nonempty("パスワードを入力してください。"),
})

// パスワードの更新用のコンポーネントを定義する
const UpdatePassword = () => {
  // エラーメッセージの状態を管理するためにuseStateフックを使う
  const [errorMessage, setErrorMessage] = useState(null)

  // パスワードの更新用の関数を定義する
  async function updatePassword(formData) {
    // supabaseのauthメソッドでユーザー情報を更新する
    const { data, error } = await supabase.auth.updateUser({
      password: formData.password,
    })

    // エラーがあれば、エラーメッセージの状態を更新する
    if (error) {
      setErrorMessage(error.message)
    }
  }

  // react-hook-formの機能を使ってフォームの登録、送信、検証を行う
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // zodResolverでスキーマ検証を行う
    resolver: zodResolver(UpdatePasswordSchema),
  })

  // JSXでフォームのUIを返す
  return (
    <div>
      <h2>ここはパスワードの更新用のページです。</h2>
      <form onSubmit={handleSubmit(updatePassword)}>
        <label htmlFor="email">新しいパスワード</label>
        <input
          // cnでクラス名に条件付きでbg-red-50という背景色を適用する
          className={cn("input", errors.password && "bg-red-50")}
          id="password"
          name="password"
          type="password"
          // registerでフォームに登録する
          {...register("password")}
        />
        {/* エラーがあれば、エラーメッセージを表示する */}
        {errors.password ? <div>{errors.password.message}</div> : null}
        <button type="submit">パスワードの更新</button>
      </form>
      {/* エラーメッセージがあれば、表示する */}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}

export default UpdatePassword
