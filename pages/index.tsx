import type { GetServerSideProps, NextPage } from "next";
import { Center, Box, Text, Button } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { BasicLayout } from "layouts/basicLayout";
import { Carousel } from "components/carousel";
import { Image } from "components/image";

import watermelon from "public/images/watermelon.jpeg";

const IndexPage: NextPage = () => {
  return (
    <BasicLayout>
      <Carousel w="full" h="80vh" infinite autoSwipe={5}>
        <Image w="100%" h="100%" alt="watermelon yes!" src={watermelon} />
        <Image w="100%" h="100%" alt="watermelon yes!" src={watermelon} />
        <Image w="100%" h="100%" alt="watermelon yes!" src={watermelon} />
        <Image w="100%" h="100%" alt="watermelon yes!" src={watermelon} />
      </Carousel>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common"])),
  },
});

export default IndexPage;
