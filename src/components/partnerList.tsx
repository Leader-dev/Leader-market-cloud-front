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
  BoxProps,
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
import { useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Card } from "src/components/card";
import { Divider } from "src/components/divider";
import { Agent } from "types/user";
import { useLoginStatus } from "utils/auth";
import { UserAvatar } from "src/components/image";
import { useSendInterestToAgent } from "services/agent/interest/sendInterestToAgent";
import { useAddFavariteAgent } from "services/agent/favorite/addFavoriteAgent";

export const AgentCard: React.FC<
  { partner: Agent; showFooter?: boolean } & BoxProps
> = ({ partner, showFooter = true, ...props }) => {
  const { t } = useTranslation("partners");
  const { t: te } = useTranslation("common", { keyPrefix: "errors" });
  const { push } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const loggedIn = useLoginStatus();
  const [loading, setLoading] = useState(false);
  const { mutate: sendInterest } = useSendInterestToAgent(partner.id);
  const { mutate: addFavorite } = useAddFavariteAgent(partner.id);

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
        <AlertDialogContent>
          <AlertDialogHeader>{te("not_logged_in")}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{te("not_logged_in_description")}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme={"blue"}
              isLoading={loading}
              onClick={() => {
                setLoading(true);
                push("/signup");
              }}
            >
              {te("jump_to_login")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card
        overflow="visible"
        overflowX="visible"
        variant="interactive"
        // href={`/partner/${partner.id}`}
        onClick={() => push(`/partners/${partner.id}`)}
        px={4}
        {...props}
        pos="relative"
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
                    // alert(`${partner.name} send interest!`);
                    sendInterest(partner.id);
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
                  // alert(`${partner.name} favorited!`);
                  addFavorite(partner.id);
                }
              }}
              aria-label="favorite"
              icon={
                <Icon
                  w={6}
                  h={6}
                  as={partner.favorite ? AiFillHeart : AiOutlineHeart}
                  color={partner.favorite ? "blue.500" : "inherit"}
                />
              }
              pointerEvents="auto"
            />
          </Flex>
        </Card.Content>
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

          {showFooter && (
            <Flex pos="absolute" bottom={2} left={0} w="100%">
              <Center w="calc(50% - 1px)">
                <Box textAlign="center">
                  <Box fontSize="xl" fontWeight="bold">
                    {partner.readCount}
                  </Box>
                  <Box>合作人气</Box>
                </Box>
              </Center>
              <Divider vertical h="64px" color="gray.300" alignSelf="center" />
              <Center w="calc(50% - 1px)">
                <Box textAlign="center">
                  <Box fontSize="xl" fontWeight="bold">
                    {partner.projectCount}
                  </Box>
                  <Box>项目</Box>
                </Box>
              </Center>
            </Flex>
          )}
        </Card.Content>
      </Card>
    </>
  );
};

export const AgentList: React.FC<{
  partners: Array<Agent>;
}> = ({ partners }) => {
  return (
    <Grid bg="#F5F5F5" templateColumns="repeat(3, 1fr)" gap={10} p={8}>
      {partners?.map((partner) => (
        <GridItem key={partner.id} pt={12}>
          <AgentCard partner={partner} h="300px" />
        </GridItem>
      ))}
    </Grid>
  );
};
