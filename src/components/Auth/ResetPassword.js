"use client"

import { useState } from "react"
import cn from "classnames"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"
import supabase from "@/lib/supabase-browser"

import Link from "next/link"

const ResetPasswordSchema = z.object({
  email: z.string().email("メールアドレスが正しくありません").nonempty("メールを入力してください。"),
})

const ResetPassword = () => {
  const { setView } = useAuth()
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  async function resetPassword(formData) {
    const { error } = await supabase.auth.resetPasswordForEmail(formData?.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`,
    })

    if (error) {
      setErrorMessage(error.message)
    } else {
      setSuccessMessage("パスワード再設定の案内を送付しました。")
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  })

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
        {errors.email ? <div>{errors.email.message}</div> : null}
        <br />
        <button type="submit">メールアドレス宛にパスワード変更用のメッセージを送信</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
      <button type="button" onClick={() => setView(VIEWS.SIGN_IN)}>
        ログイン画面に戻る
      </button>
      <br />
      <Link href="/">ホームに戻る</Link>
    </div>
  )
}

export default ResetPassword
