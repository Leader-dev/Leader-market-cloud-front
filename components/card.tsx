import {
  Box,
  BoxProps,
  Divider,
  DividerProps,
  ChakraComponent,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/react";
const cardPadding = {
  px: 4,
  py: 2,
};

// chakra custom Card multipart component
export const styles = {
  // The parts of the component
  parts: ["card", "title", "subtitle", "content", "media", "divider"],
  // The base styles for each part
  baseStyle: {
    card: {
      m: 5,
      borderRadius: "xl",
      bg: "white",
      overflow: "hidden",
      boxShadow: "md",
    },
    title: {
      ...cardPadding,
      fontSize: "lg",
      fontWeight: "bold",
      color: "gray.500",
      mb: 1,
    },
    subtitle: {
      ...cardPadding,
      fontSize: "sm",
      fontWeight: "normal",
      color: "gray.500",
      mb: 1,
    },
    content: {
      ...cardPadding,
      fontSize: "sm",
      fontWeight: "normal",
    },
    media: {},
    divider: {},
  },
  // The size styles for each part
  sizes: {},
  // The variant styles for each part
  variants: {
    interactive: {
      card: {
        transition: "box-shadow 0.2s",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "lg",
        },
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
};

export const Card = ({
  size,
  variant,
  children,
  ...rest
}: BoxProps & { size?: string; variant?: string }) => {
  const styles = useMultiStyleConfig("Card", { size, variant });

  return (
    <Box __css={styles.card} {...rest}>
      <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>
  );
};

const CardTitle: ChakraComponent<"div"> = (props) => {
  const styles = useStyles();
  return <Box __css={styles.title} {...props} />;
};
Card.Title = CardTitle;

const CardSubtitle: ChakraComponent<"div"> = (props) => {
  const styles = useStyles();
  return <Box __css={styles.subtitle} {...props} />;
};
Card.Subtitle = CardSubtitle;

const CardContent: ChakraComponent<"div"> = (props) => {
  const styles = useStyles();
  return <Box __css={styles.content} {...props} />;
};
Card.Content = CardContent;

const CardMedia: ChakraComponent<"div"> = (props) => {
  const styles = useStyles();
  return (
    <Box sx={{ "& > *": { w: "full" } }} __css={styles.media} {...props} />
  );
};
Card.Media = CardMedia;

const CardDivider = (props: DividerProps) => {
  const styles = useStyles();
  return <Divider __css={styles.divider} {...props} />;
};
Card.Divider = CardDivider;
