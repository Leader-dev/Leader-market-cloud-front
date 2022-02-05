import { useRouter } from "next/router";
import {
  Grid,
  GridItem,
  Flex,
  Avatar,
  Spacer,
  IconButton,
  Button,
  Box,
  Icon,
  Center,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { AiOutlineStar } from "react-icons/ai";

import { Card } from "components/card";
import { Divider } from "components/divider";

import { UserProfile, ContactDetails } from "types/user";

export const PartnerList: React.FC<{
  partners: Array<UserProfile & { contacts?: ContactDetails }>;
}> = ({ partners }) => {
  const { t } = useTranslation("partners");
  const { push } = useRouter();
  return (
    <Grid bg="gray.100" templateColumns="repeat(3, 1fr)" gap={10} p={8}>
      {partners?.map((partner) => (
        <GridItem key={partner.id} pt={12}>
          <Card
            overflow="visible"
            overflowX="visible"
            variant="interactive"
            // @ts-ignore
            href={`/partner/${partner.id}`}
            onClick={() => push(`/partners/${partner.id}`)}
          >
            <Card.Content>
              <Flex
                mt={-8}
                align="center"
                position="relative"
                zIndex={1}
                pointerEvents="none"
              >
                <Avatar
                  size="xl"
                  name={partner.username}
                  src={partner.avatar}
                  pointerEvents="auto"
                />
                <Spacer />
                {partner.contacts ? (
                  partner.contacts.email || partner.contacts.phone ? (
                    <Box pt={1} textAlign="right">
                      {partner.contacts.phone && (
                        <Box>{partner.contacts.phone}</Box>
                      )}
                      {partner.contacts.email && (
                        <Box>{partner.contacts.email}</Box>
                      )}
                    </Box>
                  ) : (
                    <Box pt={2}>{t("no_contact_info")}</Box>
                  )
                ) : (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`${partner.username} liked!`);
                    }}
                    variant="solid"
                    colorScheme="blue"
                    borderRadius="full"
                    size="sm"
                    mr={2}
                    mb={-2}
                    pointerEvents="auto"
                  >
                    {t("interested")}
                  </Button>
                )}

                <IconButton
                  variant="ghost"
                  mb={-2}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`${partner.username} followed!`);
                  }}
                  aria-label="follow"
                  icon={<Icon w={6} h={6} as={AiOutlineStar} />}
                  pointerEvents="auto"
                />
              </Flex>
            </Card.Content>
            <Card.Title pb={0} mb={1}>
              {partner.username}
            </Card.Title>
            <Card.Subtitle pt={0} mt={0} mb={2} pb={1}>
              {partner.org && <Box>{partner.org.name}</Box>}
            </Card.Subtitle>
            <Card.Content pt={1}>
              {partner.bio && <Box color="gray.800">{partner.bio}</Box>}
              <Flex mt={2}>
                <Center w="calc(50% - 1px)">
                  <Box textAlign="center">
                    <Box fontSize="xl" fontWeight="bold">
                      {partner.popularity}
                    </Box>
                    <Box>合作人气</Box>
                  </Box>
                </Center>
                <Divider
                  vertical
                  h="64px"
                  color="gray.300"
                  alignSelf="center"
                />
                <Center w="calc(50% - 1px)">
                  <Box textAlign="center">
                    <Box fontSize="xl" fontWeight="bold">
                      {partner.projectCount}
                    </Box>
                    <Box>项目</Box>
                  </Box>
                </Center>
              </Flex>
            </Card.Content>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
};
