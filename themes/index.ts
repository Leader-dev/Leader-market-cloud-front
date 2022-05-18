import { extendTheme } from "@chakra-ui/react";

import { styles as Card } from "src/components/card";
import { styles as Carousel } from "src/components/carousel";

export default extendTheme({
  components: {
    Card,
    Carousel,
  },
  colors: {
    paleBlue: "#91BCFF",
    grey: "#6F7070",
    bgBlack: "#212121",
  },
  fonts: {
    heading: "myFont, sans-serif",
    body: "myFont, sans-serif",
  },
  textStyles: {
    h1: {
      fontSize: ["46px", "52px"],
      fontWeight: "semibold",
      lineHeight: "110%",
    },
    h2: {
      fontSize: ["44px", "48px"],
      fontWeight: "normal",
      lineHeight: "110%",
    },
    p: {
      fontSize: ["18px", "20px"],
      color: "grey",
      fontWeight: "semibold",
    },
    title: {
      fontSize: ["36px", "40px"],
      fontWeight: "semibold",
    },
    subtitle: {
      fontSize: ["22px", "25px"],
    },
    slogan: {
      fontSize: ["46px", "50px"],
      fontWeight: "semibold",
    },
  },
});
