import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta tags para mudar a cor da barra de status e da barra de ferramentas para preto */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* Title should be defined at the page level using <Head> from next/head */}
      </Head>
      <body className="antialiased overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
