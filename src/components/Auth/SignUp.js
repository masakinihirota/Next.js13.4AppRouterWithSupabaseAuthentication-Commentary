"use client"

import { useState } from "react"
import cn from "classnames"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"
import supabase from "@/lib/supabase-browser"

import Link from "next/link"

const SignUpSchema = z.object({
  email: z.string().email("メールアドレスが正しくありません").nonempty("メールを入力してください。"),
  password: z.string().nonempty("パスワードを入力してください。"),
})

const SignUp = () => {
  const { setView } = useAuth()
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  async function signUp(formData) {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      setErrorMessage(error.message)
    } else {
      setSuccessMessage("成功しました！詳細については、メールをご確認ください。")
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  })

  return (
    <div>
      <h2>ここはアカウントの作成ページです。</h2>
      <form onSubmit={handleSubmit(signUp)}>
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
        <label htmlFor="email">パスワード</label>
        <input
          className={cn("input", errors.password && "bg-red-50")}
          id="password"
          name="password"
          type="password"
          {...register("password")}
        />
        {errors.password ? <div>{errors.password.message}</div> : null}
        <br />
        <button type="submit">アカウントを作成するボタン</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
      <button type="button" onClick={() => setView(VIEWS.SIGN_IN)}>
        すでにアカウントを作成済みの場合はログインをしてください。
        <br />
        ログイン画面に戻る。
      </button>
      <br />
      <Link href="/">ホームに戻る。</Link>
    </div>
  )
}

export default SignUp
