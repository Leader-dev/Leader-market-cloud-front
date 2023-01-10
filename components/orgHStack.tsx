import { HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Org } from "types/user";
import { OrgAvatar } from "components/image";

const OrgHStack = ({ orgList }: { orgList: Org[] }) => {
  const { push } = useRouter();
  return (
    <HStack spacing={5} mr={4}>
      {orgList.map((org) => (
        <OrgAvatar
          certification={org.certification}
          showTag={false}
          key={org.id}
          name={org.name}
          src={org.avatarUrl}
          onClick={() => {
            push(`/account/org/${org.id}`);
          }}
          h={16}
          w={16}
          transition="all 0.2s ease-in-out"
          _hover={{
            boxShadow: "lg",
            transform: "translateY(-1px)",
          }}
        />
      ))}
    </HStack>
  );
};

export default OrgHStack;
