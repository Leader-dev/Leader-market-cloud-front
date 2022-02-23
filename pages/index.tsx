import type { GetServerSideProps, NextPage } from "next";
import {
  Center,
  Box,
  HStack,
  chakra,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { BasicLayout } from "layouts/basicLayout";
import { Carousel } from "components/carousel";
import { Image } from "components/image";

import watermelon from "public/images/watermelon.jpeg";

const IndexPage: NextPage = () => {
  return (
    <BasicLayout>
      <Carousel w="full" h="62vh" infinite autoSwipe={5}>
        <Image w="100%" h="100%" alt="watermelon yes!" src={watermelon} />
        <Image w="100%" h="100%" alt="watermelon yes!" src={watermelon} />
        <Image w="100%" h="100%" alt="watermelon yes!" src={watermelon} />
        <Image w="100%" h="100%" alt="watermelon yes!" src={watermelon} />
      </Carousel>

      <VStack h={"25vh"} justify={"center"}>
        <Center textStyle={"h2"} mt={8}>
          创意 · 永恒
        </Center>
        <Center textStyle={"p"} mt={4} mb={8}>
          赋能高校学生主创活动 · 让你的创意影响世界！
        </Center>
      </VStack>

      <HStack h={"60vh"} justify={"space-between"} w={"100%"} p={"0 5%"}>
        <Box w={"60%"}>
          <Box textStyle={"h1"} mb={3}>
            麟者 · 市场云 简介
          </Box>
          <Box textStyle={"p"}>
            麟者 ·
            市场云线上平台正式开放。数轮的深化改⾰以及，激励着我们从原先数⼗⼈的微信社群⼀步步⾛到了今天。如今，已有⽆数影响⼒
            <chakra.span color={"paleBlue"}>⻘年组织</chakra.span>与
            <chakra.span color={"paleBlue"}>学⽣社团</chakra.span>
            在麟者落地⽣根；
            <chakra.span color={"paleBlue"}>数100+</chakra.span>
            由⻘年领袖或学⽣组织所主导的项⽬与创意，通过麟者获得合作与⽀持变为现实。
            <br />
            <br />从<chakra.span color={"paleBlue"}>教育</chakra.span>到
            <chakra.span color={"paleBlue"}>科技</chakra.span>
            ，我们的战略合作伙伴企业横跨
            <chakra.span color={"paleBlue"}>数个⾏业</chakra.span>
            。
            <br />
            <br />
            麒麟，乃是祥瑞之兽；名定麟者，因为我们相信每位来到麟者的小伙伴都有麒麟之姿，这也是我们对于在平台上寻求机遇与合作的小伙伴们最好的祝愿。
          </Box>
        </Box>
        <Box w={"30%"}>
          <Image
            objectFit={"cover"}
            borderRadius={"50px"}
            alt="watermelon yes!"
            src={watermelon}
          />
        </Box>
      </HStack>

      <Box p={"0 5%"} mb={"10vh"}>
        <Center textStyle={"h1"} m={"50px 0"}>
          从三个⽅⾯了解我们
        </Center>
        <Center textStyle={"p"}>
          占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占
        </Center>
        <SimpleGrid columns={3} spacingX={20} spacingY={8} mt={10}>
          <Image borderRadius={"30px"} alt="watermelon yes!" src={watermelon} />
          <Image borderRadius={"30px"} alt="watermelon yes!" src={watermelon} />
          <Image borderRadius={"30px"} alt="watermelon yes!" src={watermelon} />

          <Box textStyle={"p"}>
            占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占
          </Box>
          <Box textStyle={"p"}>
            占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占
          </Box>
          <Box textStyle={"p"}>
            占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占
          </Box>
        </SimpleGrid>
      </Box>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common"])),
  },
});

export default IndexPage;
