import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  useToast,
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
import { sendInterestToAgent } from "services/agent/interest/sendInterestToAgent";
import { addFavoriteAgent } from "services/agent/favorite/addFavoriteAgent";
import { useMutation, useQueryClient } from "react-query";
import { Id } from "types/common";

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

  let contactInfo = <Box pt={2}>{t("no_contact_info")}</Box>;
  if (partner.showContact && (partner.phone || partner.email)) {
    contactInfo = (
      <Box pt={1} textAlign="right">
        {partner.phone && <Box>{partner.phone}</Box>}
        {partner.email && <Box>{partner.email}</Box>}
      </Box>
    );
  }

  const queryClient = useQueryClient();
  const toast = useToast();
  const sendInterest = useMutation(sendInterestToAgent, {
    onMutate: async (agentId: Id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["/mc/agent/list", {}]);

      // Snapshot the previous value
      const previousAgents = queryClient.getQueryData(["/mc/agent/list", {}]);

      // Optimistically update to the new value
      queryClient.setQueryData(["/mc/agent/list", {}], (old) =>
        // @ts-ignore
        old.map((agent: Agent) =>
          agent.id === agentId ? { ...agent, interested: true } : agent
        )
      );

      toast({
        title: t("interest_sent_title"),
        description: t("interest_sent_description"),
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      // Return a context object with the snapshotted value
      return { previousAgents };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, updatedAgent, context) => {
      queryClient.setQueryData(["/mc/agent/list", {}], context.previousAgents);
    },
    // Always refetch after error or success:
    onSettled: () => {
      // queryClient.invalidateQueries(["/mc/agent/list", {}]);
      queryClient.invalidateQueries(["/mc/agent/interest/list", {}]);
    },
  });

  const addFavorite = useMutation(addFavoriteAgent, {
    onMutate: async (agentId: Id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["/mc/agent/list", {}]);

      // Snapshot the previous value
      const previousAgents = queryClient.getQueryData(["/mc/agent/list", {}]);

      // Optimistically update to the new value
      queryClient.setQueryData(["/mc/agent/list", {}], (old) =>
        // @ts-ignore
        old.map((agent: Agent) =>
          agent.id === agentId ? { ...agent, favorite: !agent.favorite } : agent
        )
      );
      // Return a context object with the snapshotted value
      return { previousAgents };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, updatedAgent, context) => {
      queryClient.setQueryData(["/mc/agent/list", {}], context.previousAgents);
    },
  });


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
            {partner.interested || (partner.userId === loggedIn) ? contactInfo : (
              <Button
                onClick={(e) => {
                  if (!loggedIn) {
                    e.stopPropagation();
                    onOpen();
                  } else {
                    e.stopPropagation();
                    sendInterest.mutate(partner.id);
                    // sendInterest(partner.id);
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
                  addFavorite.mutate(partner.id);
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
