"use client"

import { useState } from "react"
import cn from "classnames"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"
import supabase from "@/lib/supabase-browser"

import Link from "next/link"

const SignInSchema = z.object({
  email: z.string().email("メールアドレスが正しくありません").nonempty("メールを入力してください。"),
  password: z.string().nonempty("パスワードを入力してください。"),
})

const SignIn = () => {
  const { setView } = useAuth()
  const [errorMessage, setErrorMessage] = useState(null)

  async function signIn(formData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      setErrorMessage(error.message)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  })

  return (
    <div>
      <h2>ここはログインページです。</h2>
      <form onSubmit={handleSubmit(signIn)}>
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
        <br />
        {errors.password ? <div>{errors.password.message}</div> : null}
        <button type="button" onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}>
          パスワードを忘れましたか？
        </button>
        <br />
        <button type="submit">ログインボタン</button>
      </form>
      <div>
        <p>↓アカウントが無い場合は</p>
        <button type="button" onClick={() => setView(VIEWS.SIGN_UP)}>
          VNS.BLUEに登録
        </button>
      </div>
      <Link href="/">ホームに戻る。</Link>
    </div>
  )
}

export default SignIn
