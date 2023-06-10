"use client"

import { useState } from "react"
import cn from "classnames"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import supabase from "@/lib/supabase-browser"

const UpdatePasswordSchema = z.object({
  password: z.string().nonempty("パスワードを入力してください。"),
})

const UpdatePassword = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  async function updatePassword(formData) {
    const { data, error } = await supabase.auth.updateUser({
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
    resolver: zodResolver(UpdatePasswordSchema),
  })

  return (
    <div>
      <h2>ここはパスワードの更新用のページです。</h2>
      <form onSubmit={handleSubmit(updatePassword)}>
        <label htmlFor="email">新しいパスワード</label>
        <input
          className={cn("input", errors.password && "bg-red-50")}
          id="password"
          name="password"
          type="password"
          {...register("password")}
        />
        {errors.password ? <div>{errors.password.message}</div> : null}
        <button type="submit">パスワードの更新</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}

export default UpdatePassword
