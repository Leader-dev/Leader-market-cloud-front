import {
  Flex,
  Box,
  Center,
  Spacer,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  BoxProps,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { AiOutlineUser, AiOutlineGlobal } from "react-icons/ai";

import { SiteLink } from "components/siteLink";
import { useLoginStatus } from "utils/auth";

const NavLink: React.FC<
  React.ComponentProps<typeof SiteLink> & {
    /** disable text-decoration: underline when active or hovered  */
    disableUnderline?: boolean;
  }
> = ({ href, disableUnderline: disabled = false, ...props }) => {
  const router = useRouter();
  const isActive = router.pathname === href && !disabled;
  return (
    <SiteLink
      {...props}
      _hover={{
        textDecorationColor: !isActive && !disabled && "blue.200",
        color: "white",
      }}
      textDecoration="underline"
      textDecorationThickness="4px"
      textDecorationColor={isActive && !disabled ? "blue.400" : "transparent"}
      transition="text-decoration 0.1s"
      href={href}
    />
  );
};

const NavBarHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <Heading as="h1" size="md" py={5} px={4} fontWeight="medium" color="white">
      {title}·{subtitle}
    </Heading>
  );
};

const NavBarItem: React.FC<BoxProps> = (props) => {
  return (
    <Center>
      <Box
        color="white"
        fontSize="lg"
        fontWeight="bold"
        px={2}
        mx={2}
        py={5}
        {...props}
      />
    </Center>
  );
};

const NavBar = () => {
  const loggedIn = useLoginStatus();
  const router = useRouter();
  const { pathname, asPath, query } = router;

  /** create a function that redirects to the locale passed */
  const toLocale = (locale: string) => () =>
    router.push({ pathname, query }, asPath, { locale });

  const { t } = useTranslation("common");
  return (
    <Flex as="nav" px={2} bg="black">
      <NavBarHeading title={t("site.corp")} subtitle={t("site.product")} />
      <Spacer />
      <NavBarItem>
        <NavLink href="/" _target={{ color: "red.100" }}>
          {t("navbar.home")}
        </NavLink>
      </NavBarItem>
      <NavBarItem>
        <NavLink _active={{ color: "red.100" }} href="/projects">
          {t("navbar.projects")}
        </NavLink>
      </NavBarItem>
      <NavBarItem>
        <NavLink _active={{ color: "red.100" }} href="/partners">
          {t("navbar.partners")}
        </NavLink>
      </NavBarItem>
      <NavBarItem cursor="pointer">
        <Menu>
          <MenuButton as="div">
            {t("navbar.language")}
            <Icon as={AiOutlineGlobal} size="1.5em" mb={-1} ml={1} />
          </MenuButton>
          <MenuList color="black" minWidth="150px">
            <MenuItem onClick={toLocale("zh-CN")}>中文</MenuItem>
            <MenuItem onClick={toLocale("en")}>English</MenuItem>
          </MenuList>
        </Menu>
      </NavBarItem>
      {loggedIn ? (
        <NavBarItem>
          <NavLink
            _active={{ color: "red.100" }}
            href={`/partners/${loggedIn}`}
          >
            <AiOutlineUser size="1.5rem" />
          </NavLink>
        </NavBarItem>
      ) : (
        <NavBarItem bg="blue.200">
          <NavLink
            _active={{ color: "red.100" }}
            href="/signup"
            disableUnderline
          >
            {t("navbar.login_or_register")}
          </NavLink>
        </NavBarItem>
      )}
    </Flex>
  );
};

export default NavBar;
