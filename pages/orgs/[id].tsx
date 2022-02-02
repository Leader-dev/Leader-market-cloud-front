import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { BasicLayout } from "layouts/basicLayout";
import { SiteLink } from "components/siteLink";
import getOrgDetail from "services/getOrgDetail";
import getLoginStatus from "services/getLoginStatus";

const OrgDetailsPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id as string;
  const { data: org } = useQuery(getOrgDetail({ id }));
  const { data: loginStatus } = useQuery(getLoginStatus({}));
  const isSelf = loginStatus && loginStatus.id === id;
  return null;
};

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();
  const id = ctx.query.id as string;

  // query organization with id
  await Promise.all([
    queryClient.prefetchQuery(getOrgDetail({ id })),
    queryClient.prefetchQuery(getLoginStatus({})),
  ]);
  return {
    props: {
      prefetchedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common"])),
    },
  };
};
export default OrgDetailsPage;
