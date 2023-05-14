"use client"

import { useState, useRef, ChangeEvent, RefObject } from "react"

export default function Home() {
  const [name, setName] = useState<string>("")
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const inputEl = useRef<HTMLInputElement>(null)
  const handleOnClick = () => inputEl.current?.focus()

  return (
    <div style={{ margin: "2em" }}>
      <input ref={inputEl} type="text" value={name} onChange={handleOnChange} />
      <p>名前：{name}</p>
      <button onClick={handleOnClick}>フォーカスを当てる</button>
    </div>
  )
}
