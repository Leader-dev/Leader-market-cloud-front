import type { GetServerSideProps, NextPage } from "next";
import {
  Center,
  Box,
  HStack,
  chakra,
  VStack,
  SimpleGrid,
  Text,
  Flex,
  background,
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { BasicLayout } from "layouts/basicLayout";
import { Carousel } from "src/components/carousel";
import { Image } from "src/components/image";

import code from "public/images/code.svg";
import contract from "public/images/contract.svg";
import analysis from "public/images/analysis.svg";
import work from "public/images/work.svg";
import form from "public/images/forms.svg";
import indexCover from "public/images/indexCover.png";

const SloganText: React.FC = ({ children }) => {
  return (
    <Flex
      textStyle="subtitle"
      color="white"
      pos="absolute"
      w="full"
      h="22%"
      bottom={0}
      bgColor="rgba(21,21,21,0.5)"
      zIndex={1}
      flexDir="column"
      justify="center"
      px={10}
    >
      {children}
    </Flex>
  );
};

const IndexPage: NextPage = () => {
  return (
    <BasicLayout>
      <Box w="full" h="60vh" pos="relative">
        <Carousel w="100%" h="100%" infinite autoSwipe={100000}>
          <Box>
            <Image
              quality={100}
              layout="fill"
              alt="watermelon yes!"
              src={analysis}
              bgColor="#A9B2FF"
            />
            <SloganText>
              <Box>
                为
                <Text as="span" color="paleBlue" textStyle={"title"}>
                  企业机构
                </Text>
                挖掘潜力项目、
                <Text as="span" color="paleBlue" textStyle={"title"}>
                  精准
                </Text>
                对接校园Kol,
              </Box>
              <Box>圈内影响力不在话下！</Box>
            </SloganText>
          </Box>
          <Box>
            <Image
              objectFit="contain"
              quality={100}
              layout="fill"
              alt="watermelon yes!"
              src={contract}
            />
            <SloganText>
              <Box>
                为
                <Text as="span" color="paleBlue" textStyle={"title"}>
                  社团组织
                </Text>
                活动
                <Text as="span" color="paleBlue" textStyle={"title"}>
                  高效
                </Text>
                寻找赞助方，
              </Box>
              <Box>资源资金信手拈来！</Box>
            </SloganText>
          </Box>
          <Box>
            <Image
              objectFit="contain"
              quality={100}
              layout="fill"
              alt="watermelon yes!"
              src={code}
              bgColor="#A9B2FF"
            />
            <SloganText>
              <Box>
                <Text as="span" color="paleBlue" textStyle={"title"}>
                  项目活动
                </Text>
                内各类信息
                <Text as="span" color="paleBlue" textStyle={"title"}>
                  标准化
                </Text>
                排列，
              </Box>
              <Box>内容亮点一览无余！</Box>
            </SloganText>
          </Box>
          <Box>
            <Image
              objectFit="contain"
              quality={100}
              layout="fill"
              alt="watermelon yes!"
              src={form}
            />
            <SloganText>
              <Box>
                <Text as="span" color="paleBlue" textStyle={"title"}>
                  一步
                </Text>
                即可在线完成各类
                <Text as="span" color="paleBlue" textStyle={"title"}>
                  组织创立
                </Text>
                ,
              </Box>
              <Box>打造品牌影响力根据地！</Box>
            </SloganText>
          </Box>
          <Box>
            <Image
              objectFit="contain"
              quality={100}
              layout="fill"
              alt="watermelon yes!"
              src={work}
              bgColor="#A9B2FF"
            />
            <SloganText>
              <Box>
                一键
                <Text as="span" color="paleBlue" textStyle={"title"}>
                  求合作
                </Text>
                即可与项目发布方
                <Text as="span" color="paleBlue" textStyle={"title"}>
                  交换名片
                </Text>
                ,
              </Box>
              <Box>渠道人脉不再愁！</Box>
            </SloganText>
          </Box>
        </Carousel>
      </Box>

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
            borderRadius={"50px"}
            h="100%"
            w="100%"
            alt="watermelon yes!"
            src={indexCover}
          />
        </Box>
      </HStack>

      {/* <Box p={"0 5%"} mb={"10vh"}>
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
      </Box> */}
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common"])),
  },
});

export default IndexPage;
