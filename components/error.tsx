import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

export const Error = () => (
  <Alert status="error">
    <AlertIcon />
    <AlertTitle>Connection Failed</AlertTitle>
    <AlertDescription>Please check your Internet Connection.</AlertDescription>
  </Alert>
);
