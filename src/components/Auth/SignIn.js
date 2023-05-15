"use client"

// useStateフックをインポート
import { useState } from "react"
// classnamesというライブラリをインポート
import cn from "classnames"
// useFormというカスタムフックをインポート
import { useForm } from "react-hook-form"
// zodというバリデーションライブラリをインポート
import * as z from "zod"
// zodResolverという関数をインポート
import { zodResolver } from "@hookform/resolvers/zod"

// AuthProviderというコンポーネントからuseAuthとVIEWSという変数をインポート
import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"
// supabaseというデータベースライブラリをインポート
import supabase from "@/lib/supabase-browser"

// Linkというコンポーネントをインポート
import Link from "next/link"

// バリデーションスキーマを定義
const SignInSchema = z.object({
  // emailは文字列で、メールアドレスの形式で、空でないこと
  email: z.string().email("メールアドレスが正しくありません").nonempty("メールを入力してください。"),
  // passwordは文字列で、空でないこと
  password: z.string().nonempty("パスワードを入力してください。"),
})

// SignInというコンポーネントを定義
const SignIn = () => {
  const { setView } = useAuth()
  const [errorMessage, setErrorMessage] = useState(null)

  // フォームデータを使ってパスワードでサインインする関数
  async function signIn(formData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    // エラーがあればメッセージを表示する
    if (error) {
      setErrorMessage(error.message)
    }
  }

  // フォームのバリデーションとエラー処理を行うためにuseFormとzodResolverを使う
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
        {/* メールアドレスのエラーがあれば表示する */}
        {errors.email ? <div>{errors.email.message}</div> : null}
        <br />
        <label htmlFor="email">パスワード</label>
        <input
        // エラーがあれば背景色を赤く変える
          className={cn("input", errors.password && "bg-red-50")}
          id="password"
          name="password"
          type="password"
          {...register("password")}
        />
        <br />
        {/* パスワードのエラーがあれば表示する */}
        {errors.password ? <div>{errors.password.message}</div> : null}
        {/* パスワードを忘れた場合のボタン */}
        <button type="button" onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}>
          パスワードを忘れましたか？
        </button>
        <br />
        {/* ログインするためのボタン */}
        <button type="submit">ログインボタン</button>
      </form>
      <div>
        <p>↓アカウントが無い場合は</p>
        {/* サインアップページに移動するためのボタン */}
        <button type="button" onClick={() => setView(VIEWS.SIGN_UP)}>
          VNS.BLUEに登録
        </button>
      </div>
      {/* ホームページに戻るためのリンク */}
      <Link href="/">ホームに戻る。</Link>
    </div>
  )
}

export default SignIn
