import Document, { Html, Head, Main, NextScript } from "next/document";

class _ extends Document<unknown> {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="index, follow" />
          <link rel="icon" href="vercel.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _;
