import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <title>BeeSpace</title>
      <meta charSet="utf-8" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <meta name="description" content="개발자 포트폴리오 공유 사이트" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
