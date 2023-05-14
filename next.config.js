/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true }

module.exports = nextConfig


// React StrictMode は、アプリケーション内の潜在的な問題を洗い出すためのツールです。
// 未使用の props や未定義の変数などの潜在的な問題を検出します。
// 開発環境でのみ有効になります。

// 使用方法
// import React, { StrictMode } from 'react';

//       <StrictMode>
//         <h1>Hello, world!</h1>
//       </StrictMode>
