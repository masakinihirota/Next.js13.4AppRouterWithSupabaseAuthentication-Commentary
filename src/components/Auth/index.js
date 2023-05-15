// クライアントモードを使用する
"use client"

// AuthProviderからuseAuthとVIEWSをインポートする
import { useAuth, VIEWS } from "./AuthProvider"
// ResetPassword, SignIn, SignUp, UpdatePasswordコンポーネントをインポートする
import ResetPassword from "./ResetPassword"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import UpdatePassword from "./UpdatePassword"

// Authコンポーネントを定義する
const Auth = ({ view: initialView }) => {
  // useAuthからviewを取得する
  let { view } = useAuth()

  // initialViewがあればviewに代入する
  if (initialView) {
    view = initialView
  }

  // viewに応じて適切なコンポーネントを返す
  switch (view) {
    case VIEWS.UPDATE_PASSWORD:
      return <UpdatePassword />
    case VIEWS.FORGOTTEN_PASSWORD:
      return <ResetPassword />
    case VIEWS.SIGN_UP:
      return <SignUp />
    default:
      return <SignIn />
  }
}

// Authコンポーネントをエクスポートする
export default Auth
