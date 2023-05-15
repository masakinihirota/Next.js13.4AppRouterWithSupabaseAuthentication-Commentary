// クライアントモードを使用する
"use client"

// useState, cn, useForm, z, zodResolverをインポートする
import { useState } from "react"
import cn from "classnames"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// AuthProviderからuseAuthとVIEWSをインポートする
import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"
// supabaseをインポートする
import supabase from "@/lib/supabase-browser"

// Linkをインポートする
import Link from "next/link"

// ResetPasswordSchemaを定義する
const ResetPasswordSchema = z.object({
  email: z.string().email("メールアドレスが正しくありません").nonempty("メールを入力してください。"),
})

// ResetPasswordコンポーネントを定義する
const ResetPassword = () => {
  // setView, errorMessage, successMessageのステートを定義する
  const { setView } = useAuth()
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // resetPassword関数を定義する
  async function resetPassword(formData) {
    // supabaseのresetPasswordForEmailメソッドでパスワード再設定用のメールを送信する
    const { error } = await supabase.auth.resetPasswordForEmail(formData?.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`,
    })

    // エラーがあればerrorMessageにセットする
    if (error) {
      setErrorMessage(error.message)
    } else {
      // エラーがなければsuccessMessageにセットする
      setSuccessMessage("パスワード再設定の案内を送付しました。")
    }
  }

  // useFormでフォームの制御を行う
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  })

  // JSXを返す
  return (
    <div>
      <h2>パスワードを忘れた人用のページです。</h2>
      <form onSubmit={handleSubmit(resetPassword)}>
        <label htmlFor="email">メールアドレス</label>
        <input
          className={cn("input", errors.email && "bg-red-50")}
          id="email"
          name="email"
          placeholder="masakinihirota@vns.blue"
          type="email"
          {...register("email")}
        />
        {/* エラーメッセージがあれば表示する */}
        {errors.email ? <div>{errors.email.message}</div> : null}
        <br />
        <button type="submit">メールアドレス宛にパスワード変更用のメッセージを送信</button>
      </form>
      {/* errorMessageがあれば表示する */}
      {errorMessage && <div>{errorMessage}</div>}
      {/* successMessageがあれば表示する */}
      {successMessage && <div>{successMessage}</div>}
      <button type="button" onClick={() => setView(VIEWS.SIGN_IN)}>
        ログイン画面に戻る
      </button>
      <br />
      {/* ホームへのリンク */}
      <Link href="/">ホームに戻る</Link>
    </div>
  )
}

export default ResetPassword
