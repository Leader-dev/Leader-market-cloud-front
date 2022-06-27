import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  ButtonProps,
  Menu,
  FormLabel,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useField } from "formik";
import { useQuery } from "react-query";
import getOrgManageList from "services/org/manage/getOrgManageList";
import { OrgAvatar } from "./image";

export const SelectOrg = ({
  name,
  label,
  ...props
}: ButtonProps & { name: string; label: string }) => {
  const { data: orgList } = useQuery(getOrgManageList({}));
  const orgDict =
    orgList && Object.assign({}, ...orgList.map((org) => ({ [org.id]: org })));
  // useEffect(() => {
  //   if (orgList) {
  //     orgNameDict = Object.assign({}, ...orgList.map(org => ({[org.id]: org.name})));
  //   }
  // }, [orgList]);
  const [field, meta, { setValue }] = useField(name);
  return (
    <Menu matchWidth={true}>
      <FormLabel mt={4}>{label}</FormLabel>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        width="full"
        textAlign="left"
        fontWeight="normal"
        {...props}
      >
        {field.value ? orgDict[field.value].name : "N/A"}
      </MenuButton>
      <MenuList>
        <MenuItem
          w="full"
          key="empty"
          value={undefined}
          onClick={(val) => setValue(val)}
          justifyContent="center"
        >
          N/A
        </MenuItem>
        {orgDict &&
          Object.keys(orgDict).map((orgId) => (
            <MenuItem
              key={orgId}
              value={orgId}
              onClick={(val) => setValue(val)}
            >
              <OrgAvatar
                src={orgDict[orgId].avatarUrl}
                certification={orgDict[orgId].certification}
                showTag={false}
                mr={2}
              />
              {orgDict[orgId].name}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};
