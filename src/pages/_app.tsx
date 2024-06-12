import "styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { TabProvider } from "contexts/nav";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MuiTheme, createEmotionCache } from "theme";
import { CacheProvider, EmotionCache } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

interface Props extends AppProps {
  emotionCache: any;
}
const App = ({ emotionCache = clientSideEmotionCache, Component, pageProps }: Props) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={MuiTheme}>
          <TabProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </TabProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default App;
