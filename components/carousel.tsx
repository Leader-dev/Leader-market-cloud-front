import {
  Box as ChakraBox,
  BoxProps,
  Flex,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { Children, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const Box = motion<Omit<BoxProps, "transition">>(ChakraBox);

export const styles = {
  parts: ["carousel", "item"],
  baseStyle: {
    carousel: {
      overflowX: "hidden",
      position: "relative",
    },
    item: {
      position: "absolute",
      top: 0,
      overflow: "hidden",
      width: "100%",
      height: "100%",
    },
  },
  sizes: {},
  variants: {
    bold: {
      item: {
        fontWeight: "bold",
      },
      carousel: {
        boxShadow: "xl",
      },
    },
    colorful: {
      item: {
        color: "orange.600",
      },
      carousel: {
        bg: "orange.100",
      },
    },
  },
  defaultProps: {
    size: "md",
  },
};

export type CarouselProps = React.ComponentProps<typeof ChakraBox> & {
  variant?: keyof typeof styles.variants;
  size?: keyof typeof styles.sizes;
  infinite?: boolean;
  autoSwipe: number;
};

export const Carousel: React.FC<CarouselProps> = ({
  size,
  variant,
  children,
  infinite = false,
  autoSwipe = 0,
  ...props
}) => {
  const styles = useMultiStyleConfig("Carousel", { size, variant });
  const [current, setCurrent] = useState(0);

  const previous = () => {
    let newCurrent = current - 1;
    if (newCurrent < 0) {
      if (infinite) {
        newCurrent = Children.count(children) - 1;
      } else {
        newCurrent = 0;
      }
    }
    setCurrent(newCurrent);
  };
  const next = useCallback(() => {
    let newCurrent = current + 1;
    if (newCurrent >= Children.count(children)) {
      if (infinite) {
        newCurrent = 0;
      } else {
        newCurrent = Children.count(children) - 1;
      }
    }
    setCurrent(newCurrent);
  }, [current, children, infinite]);

  useEffect(() => {
    if (autoSwipe) {
      const interval = setInterval(() => {
        next();
      }, autoSwipe * 1000);
      return () => clearInterval(interval);
    }
  }, [autoSwipe, next]);


  return (
    <ChakraBox __css={styles.carousel} {...props} bgColor="black">
      <IconButton
        aria-label="Previous"
        borderRadius="full"
        position="absolute"
        left="8px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        // variant="ghost"
        bg="rgba(220,220,220,0.8)"
        _hover={{ opacity: 0.5 }}
        onClick={previous}
        icon={<Icon h="20px" w="20px" as={AiFillCaretLeft} />}
      />
      <IconButton
        aria-label="Next"
        borderRadius="full"
        position="absolute"
        right="8px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        // variant="ghost"
        bg="rgba(220,220,220,0.8)"
        _hover={{ opacity: 0.5 }}
        onClick={next}
        icon={<Icon h="20px" w="20px" as={AiFillCaretRight} />}
      />
      <StylesProvider value={styles}>
        {Children.map(children, (child, index) => {
          return (
            <CarouselItem
              key={index}
              animationPos={
                index === current
                  ? "center"
                  : index > current
                  ? "right"
                  : "left"
              }
            >
              {child}
            </CarouselItem>
          );
        })}
      </StylesProvider>
    </ChakraBox>
  );
};

const CarouselItem: React.FC<
  React.ComponentProps<typeof Box> & {
    animationPos: "left" | "center" | "right";
  }
> = ({ animationPos: pos, ...props }) => {
  const styles = useStyles();
  const variants = {
    left: {
      x: "-100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    right: {
      x: "100%",
      opacity: 0,
    },
  };
  return (
    <Box
      {...props}
      __css={styles.item}
      variants={variants}
      initial={pos}
      animate={pos}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    />
  );
};