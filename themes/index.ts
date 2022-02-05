import { extendTheme } from "@chakra-ui/react";

import { styles as Card } from "components/card";
import { styles as Carousel } from "components/carousel";

export default extendTheme({
  components: {
    Card,
    Carousel,
  },
});
