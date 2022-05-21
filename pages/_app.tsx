import { useState } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, Hydrate, QueryClient } from "react-query";
import { appWithTranslation } from "next-i18next";
import "focus-visible/dist/focus-visible";
import theme from "themes";
import Fonts from "themes/fonts";
import Head from "next/head";

import { Global, css } from "@emotion/react";
const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <Global styles={GlobalStyles} />
          <Fonts />
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
