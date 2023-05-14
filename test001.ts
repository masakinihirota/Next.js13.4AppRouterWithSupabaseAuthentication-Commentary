// Userの型
// id 数字
// name  名前
// note配列
//   タイトル 文字列
//   タグ 文字列配列
type User = {
  id: number
  name: string
  note: {
    title: string
    tags: string[]
  }[]
}

type GetUsers = () => User[]

export const getUsers: GetUsers = () => {
  return [
    {
      id: 1,
      name: "ユーザー1",
      note: [
        {
          title: "note1",
          tags: ["タグ1", "タグ2"],
        },
      ],
    },
  ]
}
