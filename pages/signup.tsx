import { NextPage, GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Grid,
  GridItem,
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
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Checkbox, useControllableState,
} from "@chakra-ui/react";
import { Formik, Field, Form, FieldProps } from "formik";
import * as Yup from "yup";
import { useTranslation, Trans } from "next-i18next";

import { BasicLayout } from "layouts/basicLayout";
import { SiteLink } from "components/siteLink";
import { useState } from "react";
import {login} from "services/user/login";
import {useRouter} from "next/router";
import {getAuthCode} from "services/user/getAuthcode";
import {register} from "services/user/register";
import {checkAuthCode} from "services/user/checkAuthcode";

type ResponsiveLeftImageProps = {
  left: React.ReactNode;
};
const ResponsiveLeftImage: React.FC<ResponsiveLeftImageProps> = ({
  left,
  children,
}) => {
  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        null,
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={[0, null, 4]}
      p={[0, null, 4]}
    >
      <GridItem display={["none", null, "block"]} colSpan={[0, null, 1, 2]}>
        {left}
      </GridItem>
      <GridItem>{children}</GridItem>
    </Grid>
  );
};


const InputField = ({
  name,
  hide,
  right,
}: {
  name: string;
  hide?: boolean;
  right?: React.ReactNode;
}) => {
  const { t } = useTranslation("signup");
  const { t: te } = useTranslation("signup", { keyPrefix: "errors" });
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl
          mb={3}
          isInvalid={!!(form.errors[name] && form.touched[name])}

        >
          <FormLabel htmlFor={name}>{t(name)}</FormLabel>
          <InputGroup>
            <Input
              {...field}
              id={name}
              type={hide ? "password" : undefined}
              pr={right ? "5.5rem" : undefined}
            />
            {right && <InputRightElement w="5.5rem">{right}</InputRightElement>}
          </InputGroup>
          <FormErrorMessage>{te(form.errors[name] as string)}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("u.required"),
  password: Yup.string().required("p.required"),
});
const Login = () => {
  const { t } = useTranslation("signup");
  const {push} = useRouter();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        login({phone: values.username, password: values.password, authcode: null}).then(() => {
          setSubmitting(false);
          push("/account");
        }).catch(() => {
          setSubmitting(false);
          // TODO catch error
        });
      }}
    >
      {(props) => (
        <Form>
          <InputField name="username" />
          <InputField name="password" hide />
          <Button
            w="full"
            variant="solid"
            colorScheme="blue"
            type="submit"
            isLoading={props.isSubmitting}
          >
            {t("login")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const RegisterStep1Schema = Yup.object().shape({
  phone_number: Yup.string().required("n.required"),
  auth_code: Yup.string().required("a.required"),
  agree: Yup.boolean().oneOf([true], "l.required"),
});

const RegisterStep1: React.FC<{
  cb: (phone: string, authCode: string) => void;
}> = ({ cb }) => {
  const { t } = useTranslation("signup");
  return (
    <Formik
      initialValues={{
        phone_number: "",
        auth_code: "",
        agree: false,
      }}
      validationSchema={RegisterStep1Schema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        cb(values.phone_number, values.auth_code);
      }}
    >
      {(props) => (
        <Form>
          <InputField name="phone_number"/>
          <InputField
            name="auth_code"
            right={
              <Button variant="link" size="sm" h="1.5rem" onClick={() => {
                getAuthCode({phone: props.values.phone_number})
              }}>
                {t("send_auth_code")}
              </Button>
            }
          />
          <FormControl
            mb={3}
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
          <Button
            w="full"
            variant="solid"
            colorScheme="blue"
            type="submit"
            isLoading={props.isSubmitting}
          >
            {t("next_step")}
          </Button>
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
          <InputField name="username" />
          <InputField name="password" hide />
          <Button
            w="full"
            variant="solid"
            colorScheme="blue"
            type="submit"
            isLoading={props.isSubmitting}
          >
            {t("register")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const Register = () => {
  const { t } = useTranslation("signup");
  const [stage1Done, setStage1Done] = useState(false);
  const [phone, setPhone] = useState("");
  const [authCode, setAuthCode] = useState("");
  const {push} = useRouter();
  return !stage1Done ? (
    <RegisterStep1 cb={(phone, authCode) => {
      setStage1Done(true)
      setPhone(phone)
      setAuthCode(authCode)
    }}/>
  ) : (
    <RegisterStep2 cb={(nickname, password) => {
      register({nickname, password, phone, authcode: authCode}).then(() => {
        push("/account");
      })
    }}/>
  );
};

const SignupBox = () => {
  const { t } = useTranslation("signup");
  return (
    <Box>
      <Tabs isFitted>
        <TabList>
          <Tab>{t("login")}</Tab>
          <Tab>{t("register")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Register />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const SignupPage: NextPage = () => {
  return (
    <BasicLayout pageTitle="Sign In">
      <ResponsiveLeftImage left={<Box>Image</Box>}>
        <SignupBox />
      </ResponsiveLeftImage>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "signup"])),
  },
});

export default SignupPage;
