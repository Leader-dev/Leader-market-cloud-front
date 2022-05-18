import { useState } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, Hydrate, QueryClient } from "react-query";
import { appWithTranslation } from "next-i18next";

import theme from "themes";
import Fonts from "themes/fonts";

// if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
//   require("mocks");
// }

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.prefetchedState}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
