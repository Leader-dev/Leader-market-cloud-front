import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Card } from "src/components/card";
import { Divider } from "src/components/divider";
import { Agent } from "types/user";
import { useLoginStatus } from "utils/auth";
import { UserAvatar } from "src/components/image";

export const PartnerList: React.FC<{
  partners: Array<Agent>;
}> = ({ partners }) => {
  const { t } = useTranslation("partners");
  const { t: te } = useTranslation("common", { keyPrefix: "errors" });
  const { push } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const loggedIn = useLoginStatus();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent pb={4}>
          <AlertDialogHeader>{te("not_logged_in")}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{te("not_logged_in_description")}</AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      <Grid bg="#F5F5F5" templateColumns="repeat(3, 1fr)" gap={10} p={8}>
        {partners?.map((partner) => (
          <GridItem key={partner.id} pt={12}>
            <Card
              overflow="visible"
              overflowX="visible"
              variant="interactive"
              // href={`/partner/${partner.id}`}
              onClick={() => push(`/partners/${partner.id}`)}
              px={4}
            >
              <Card.Content>
                <Flex
                  mt={-8}
                  align="center"
                  position="relative"
                  zIndex={1}
                  pointerEvents="none"
                >
                  <UserAvatar
                    size="xl"
                    name={partner.name}
                    src={partner.avatarUrl}
                    pointerEvents="auto"
                  />
                  <Spacer />
                  {partner.interested ? (
                    partner.showContact ? (
                      <Box pt={1} textAlign="right">
                        {partner.phone && <Box>{partner.phone}</Box>}
                        {partner.email && <Box>{partner.email}</Box>}
                      </Box>
                    ) : (
                      <Box pt={2}>{t("not_show_to_public")}</Box>
                    )
                  ) : (
                    <Button
                      onClick={(e) => {
                        if (!loggedIn) {
                          onOpen();
                          e.stopPropagation();
                        } else {
                          e.stopPropagation();
                          alert(`${partner.name} send interest!`);
                        }
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
                      if (!loggedIn) {
                        onOpen();
                        e.stopPropagation();
                      } else {
                        e.stopPropagation();
                        alert(`${partner.name} favorited!`);
                      }
                    }}
                    aria-label="favorite"
                    icon={<Icon w={6} h={6} as={AiOutlineHeart} />}
                    pointerEvents="auto"
                  />
                </Flex>
              </Card.Content>
              <Box h="250px" pos="relative">
                <Card.Title pb={0} mb={1}>
                  {partner.name}
                </Card.Title>
                <Card.Subtitle pt={0} mt={0} mb={2} pb={1}>
                  {partner.orgInfo && <Box>{partner.orgInfo.name}</Box>}
                </Card.Subtitle>
                <Card.Content pt={1}>
                  {partner.description && (
                    <Box color="gray.800">{partner.description}</Box>
                  )}
                  <Flex mt={2} pos="absolute" bottom={2} left={0} w="100%">
                    <Center w="calc(50% - 1px)">
                      <Box textAlign="center">
                        <Box fontSize="xl" fontWeight="bold">
                          {partner.readCount}
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
              </Box>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};