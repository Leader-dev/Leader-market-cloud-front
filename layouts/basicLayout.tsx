import Head from "next/head";
import { Flex, Box } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

import NavBar from "components/navbar";
import Footer from "components/footer";

/** NextPage wrapper */
export const BasicLayout: React.FC<{
  pageTitle?: string;
  backgroundColor?: string;
}> = ({ children, pageTitle, backgroundColor }) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>
          {pageTitle
            ? `${pageTitle} - ${t("site.product")}`
            : t("site.product")}
        </title>
      </Head>
      <Flex minH="100vh" direction="column">
        <NavBar />
        <Box flexGrow={1} backgroundColor={backgroundColor}>
          {children}
        </Box>
        <Footer />
      </Flex>
    </>
  );
};
