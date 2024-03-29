import { NextPage, GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Box,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  Checkbox,
  InputLeftElement,
  Icon,
  InputProps,
  Stack,
  Spacer,
  Flex,
  BoxProps,
  InputLeftAddon,
  Center,
} from "@chakra-ui/react";
import { Formik, Field, Form, FieldProps } from "formik";
import * as Yup from "yup";
import { useTranslation, Trans } from "next-i18next";

import { BasicLayout } from "layouts/basicLayout";
import { SiteLink } from "components/siteLink";
import { useState } from "react";
import { login } from "services/user/login";
import { useRouter } from "next/router";
import { getAuthCode } from "services/user/getAuthcode";
import { register } from "services/user/register";
import { AiOutlineKey, AiOutlineMobile, AiOutlineUser } from "react-icons/ai";
import indexCover from "public/images/indexCover.png";
import { Image } from "components/image";
import React from "react";
import { checkAuthCode } from "services/user/checkAuthcode";
import { Cookies } from "react-cookie";

// type ResponsiveLeftImageProps = {
//   left: React.ReactNode;
// };

// const ResponsiveLeftImage: React.FC<ResponsiveLeftImageProps> = ({
//   left,
//   children,
// }) => {
//   return (
//     <Grid
//       templateColumns={[
//         "repeat(1, 1fr)",
//         null,
//         "repeat(2, 1fr)",
//         "repeat(3, 1fr)",
//       ]}
//       gap={[0, null, 4]}
//       p={[0, null, 4]}
//     >
//       <GridItem display={["none", null, "block"]} colSpan={[0, null, 1, 2]}>
//         {left}
//       </GridItem>
//       <GridItem>{children}</GridItem>
//     </Grid>
//   );
// };

const InputField = ({
  name,
  hide,
  rightElement,
  leftElement,
  placeholder,
  ...props
}: InputProps & {
  name: string;
  hide?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  placeholder?: string;
}) => {
  const { t: te } = useTranslation("signup", { keyPrefix: "errors" });
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl
          mb={3}
          isInvalid={!!(form.errors[name] && form.touched[name])}
        >
          <InputGroup>
            {leftElement}
            <Input
              {...field}
              {...props}
              id={name}
              type={hide ? "password" : undefined}
              pr={rightElement ? "5.5rem" : undefined}
              variant="flushed"
              placeholder={placeholder}
            />
            {rightElement && (
              <InputRightElement w="5.5rem">{rightElement}</InputRightElement>
            )}
          </InputGroup>
          <FormErrorMessage>{te(form.errors[name] as string)}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .required("n.required")
    .matches(/^[0-9]{11}$/, "phone.invalid"),
  password: Yup.string().required("p.required"),
});
const Login = () => {
  const { t } = useTranslation("signup");
  const { push } = useRouter();
  return (
    <Formik
      initialValues={{
        phone: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        login({
          phone: values.phone,
          password: values.password,
          authcode: null,
        })
          .then(() => {
            setSubmitting(false);
            push("/account");
          })
          .catch(() => {
            setSubmitting(false);
            // TODO catch error
          });
      }}
    >
      {(props) => (
        <Form>
          <InputField
            name="phone"
            placeholder={t("input_phone_number")}
            leftElement={
              <InputLeftElement>
                <Icon as={AiOutlineMobile} />
              </InputLeftElement>
            }
          />
          <InputField
            name="password"
            mt={5}
            hide
            placeholder={t("input_password")}
            leftElement={
              <InputLeftElement mt={5}>
                <Icon as={AiOutlineKey} />
              </InputLeftElement>
            }
          />
          <Center>
            <Button
              w="70%"
              variant="solid"
              colorScheme="blue"
              type="submit"
              mt={14}
              borderRadius={"full"}
              bgColor="#163CAA"
              isLoading={props.isSubmitting}
            >
              {t("login")}
            </Button>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

const RegisterStep1Schema = Yup.object().shape({
  phone_number: Yup.string()
    .required("n.required")
    .matches(/^[0-9]{11}$/, "n.invalid"),
  auth_code: Yup.string().required("a.required"),
  agree: Yup.boolean().oneOf([true], "l.required"),
});

const RegisterStep1: React.FC<{
  cb: (phone: string, authCode: string) => void;
}> = ({ cb }) => {
  const { t } = useTranslation("signup");
  const cookies = new Cookies();
  const [getAuthText, setGetAuthText] = useState<string>(t("send_auth_code"));
  const [disable, setDisable] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        phone_number: "",
        auth_code: "",
        agree: false,
      }}
      validationSchema={RegisterStep1Schema}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        checkAuthCode({
          phone: values.phone_number,
          authcode: values.auth_code,
        })
          .then(() => {
            setSubmitting(false);
            cb(values.phone_number, values.auth_code);
          })
          .catch(() => {
            setErrors({ auth_code: "a.invalid" });
            setSubmitting(false);
          });
      }}
    >
      {(props) => (
        <Form>
          <InputField
            name="phone_number"
            placeholder={t("input_phone_number")}
            paddingLeft={2}
            leftElement={<InputLeftAddon>+86</InputLeftAddon>}
          />
          <InputField
            name="auth_code"
            mt={2}
            rightElement={
              <Button
                variant="link"
                size="sm"
                h="1.5rem"
                mt={2}
                disabled={disable}
                onClick={() => {
                  props.setFieldTouched("phone_number", true, true);
                  if (props.errors.phone_number) return;
                  setDisable(true);
                  getAuthCode({ phone: props.values.phone_number }).then(() => {
                    cookies.set("countdown", "60", { path: "/", maxAge: 61 });
                    let timer = setInterval(() => {
                      if (cookies.get("countdown") !== "0") {
                        const countdown = (
                          parseInt(cookies.get("countdown")) - 1
                        ).toString();
                        cookies.set("countdown", countdown, {
                          path: "/",
                          maxAge: 60,
                        });
                        setGetAuthText(
                          `${t("send_auth_code")} (${countdown}s)`
                        );
                      } else {
                        clearInterval(timer);
                        cookies.remove("countdown", { path: "/" });
                        setGetAuthText(t("send_auth_code_again"));
                        setDisable(false);
                      }
                    }, 1000);
                  });
                }}
              >
                {getAuthText}
              </Button>
            }
          />
          <FormControl
            mb={3}
            mt={10}
            isInvalid={!!(props.errors.agree && props.touched.agree)}
          >
            <Checkbox
              id="agree"
              name="agree"
              checked={props.values.agree!}
              onChange={() => {
                props.setFieldValue("agree", !props.values.agree);
              }}
            >
              <Trans t={t} i18nKey="agree_eula">
                I have read and agreed to the <SiteLink>EULA</SiteLink> and{" "}
                <SiteLink>Privacy Policy</SiteLink>
              </Trans>
            </Checkbox>
            <FormErrorMessage>
              {t(`errors.${props.errors["agree"]}`)}
            </FormErrorMessage>
          </FormControl>
          <Center>
            <Button
              w="70%"
              variant="solid"
              colorScheme="blue"
              type="submit"
              isLoading={props.isSubmitting}
              bgColor="#163CAA"
              borderRadius={"full"}
              mt={3}
            >
              {t("next_step")}
            </Button>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

const RegisterStep2Schema = Yup.object().shape({
  username: Yup.string().required("u.required"),
  password: Yup.string().required("p.required"),
});
const RegisterStep2: React.FC<{
  cb: (nickname: string, password: string) => void;
}> = ({ cb }) => {
  const { t } = useTranslation("signup");
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={RegisterStep2Schema}
      onSubmit={(values, { setSubmitting }) => {
        // TODO
        setSubmitting(false);
        cb(values.username, values.password);
      }}
    >
      {(props) => (
        <Form>
          <InputField
            name="username"
            placeholder={t("input_username")}
            leftElement={
              <InputLeftElement>
                <Icon as={AiOutlineUser} />
              </InputLeftElement>
            }
          />
          <InputField
            mt={5}
            name="password"
            hide
            placeholder={t("input_password")}
            leftElement={
              <InputLeftElement mt={5}>
                <Icon as={AiOutlineKey} />
              </InputLeftElement>
            }
          />
          <Button
            w="full"
            variant="solid"
            colorScheme="blue"
            type="submit"
            isLoading={props.isSubmitting}
            bgColor="#163CAA"
            borderRadius={"full"}
            mt={8}
          >
            {t("register")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const Register = () => {
  const [stage1Done, setStage1Done] = useState(false);
  const [phone, setPhone] = useState("");
  const [authCode, setAuthCode] = useState("");
  const { push } = useRouter();
  return !stage1Done ? (
    <RegisterStep1
      cb={(phone, authCode) => {
        setStage1Done(true);
        setPhone(phone);
        setAuthCode(authCode);
      }}
    />
  ) : (
    <RegisterStep2
      cb={(nickname, password) => {
        register({ nickname, password, phone, authcode: authCode }).then(() => {
          push("/account");
        });
      }}
    />
  );
};

const SignupBox = ({ ...props }: BoxProps) => {
  const { t } = useTranslation("signup");
  return (
    <Box {...props}>
      <Tabs variant={"unstyled"}>
        <Stack h="full" align="stretch">
          <TabList w="full" px="15%">
            <Tab
              _selected={{ borderBottom: "4px solid #163CAA" }}
              fontWeight="bold"
              fontSize={["34px", "30px"]}
            >
              {t("login")}
            </Tab>
            <Spacer />
            <Tab
              _selected={{ borderBottom: "4px solid #163CAA" }}
              fontWeight="bold"
              fontSize={["36px", "32px"]}
            >
              {t("register")}
            </Tab>
          </TabList>
          <TabPanels pt={6}>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Stack>
      </Tabs>
    </Box>
  );
};

const SignupPage: NextPage = () => {
  return (
    <BasicLayout pageTitle="Sign In">
      {/* <ResponsiveLeftImage left={<Box w="600px" h="400px" pos="relative" ><Image layout="fill" borderRadius="30px" src={indexCover} /></Box>}>
        <SignupBox />
      </ResponsiveLeftImage> */}
      <Flex px="10vw" w="full" h="40vh" align="center" pt="20vh">
        <Box w="40%" pos="relative">
          <Image
            alt="logo"
            layout="responsive"
            borderRadius="30px"
            src={indexCover}
          />
        </Box>
        <Spacer />
        <SignupBox w="30vw" />
      </Flex>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "signup"])),
  },
});

export default SignupPage;
