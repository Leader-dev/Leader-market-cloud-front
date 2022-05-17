import {
  Box,
  Grid,
  GridItem,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import { SiteLink } from "src/components/siteLink";

const FooterHeading: React.FC = ({ children }) => {
  return (
    <Heading as="h3" size="sm" fontWeight="medium" color="white" mb={4}>
      {children}
    </Heading>
  );
};
const FooterLinks: React.FC = ({ children }) => {
  return (
    <UnorderedList as="ul" mb={4} styleType="none" m={0}>
      {children}
    </UnorderedList>
  );
};
const FooterLink: React.FC<{ href: string }> = ({ children, href }) => {
  return (
    <ListItem>
      <SiteLink display="box" href={href}>
        {children}
      </SiteLink>
    </ListItem>
  );
};

const Footer = () => {
  return (
    <Box as="footer" bg="bgBlack" color="white" px={16} pt={14} pb={8}>
      <Grid templateColumns="repeat(4, 1fr)" gap={4} p={8} pb={14}>
        <GridItem colSpan={2}>BIG ICON</GridItem>
        <GridItem colSpan={1}>
          <FooterHeading>Customer Services</FooterHeading>
          <FooterLinks>
            <FooterLink href="/">Contact Us</FooterLink>
            <FooterLink href="/">Contact Us</FooterLink>
            <FooterLink href="/">Contact Us</FooterLink>
            <FooterLink href="/">Contact Us</FooterLink>
          </FooterLinks>
        </GridItem>
        <GridItem colSpan={1}>
          <FooterHeading>About Us</FooterHeading>
          <FooterLinks>
            <FooterLink href="/">Contact Us</FooterLink>
            <FooterLink href="/">Contact Us</FooterLink>
            <FooterLink href="/">Contact Us</FooterLink>
            <FooterLink href="/">Contact Us</FooterLink>
          </FooterLinks>
        </GridItem>
      </Grid>

      <Box textAlign="center">
        Copy right @ 2021 X Company. All rights reserved
      </Box>
    </Box>
  );
};

export default Footer;
