import { rest } from "msw";
import { Agent, Org } from "../types/user";
import { Project } from "../types/project";

let orgList: Org[] = [
  {
    id: "1",
    name: "麟果科技",
    description:
      "深圳市麟果科技有限公司，是一家专注于移动互联网应用开发的高科技企业。",
    slogan: "高端科技，智能推荐",
    avatarUrl:
      "https://tva1.sinaimg.cn/large/e6c9d24egy1h1zspgl5dlj213y0u0qdb.jpg",
    certification: "school",
    memberCount: 1,
    projectCount: 1,
  },
];
let agentList: Agent[] = [
  {
    id: "1",
    userId: "1",
    name: "老罗",
    description: "麟果科技公司的高级前端工程师",
    avatarUrl:
      "https://tva1.sinaimg.cn/large/e6c9d24egy1h1zspgl5dlj213y0u0qdb.jpg",
    projectCount: 1,
    showContact: true,
    email: "theGreatestRobert@gmail.com",
    phone: "626-123-4567",
    interested: true,
    displayOrgId: "1",
    readCount: 99,
    orgInfo: orgList[0],
  },
];
let projectList: Project[] = [
  {
    id: "1",
    title: "领者市场云平台开发",
    orgId: "1",
    orgInfo: orgList[0],
    readCount: 13,
    coverUrl: "https://static-cse.canva.com/blob/651728/poster.jpg",
    agentId: "1",
    agentInfo: agentList[0],
    startDate: "1651870286",
    endDate: "1651870286",
    publishDate: "1651870286",
    updateDate: "1651870286",
    draft: false,
    status: "active",
    tags: ["线上", "前端", "后端"],
    content:
      "这是一个网页开发项目，用于提供市场相关的服务，基于领者移动端的云平台。",
  },
];

export const handlers = [
  rest.post("/account/user/userid", (req, res, ctx) => {
    return res(
      ctx.json({
        userid: "1",
      })
    );
  }),
  rest.get("/mc/org/list", (req, res, ctx) => {
    return res(
      ctx.json({
        list: orgList,
      })
    );
  }),
  rest.get("/mc/org/detail?orgId=:orgId", (req, res, ctx) => {
    const { orgId } = req.params;
    console.log(orgId);
    const info = orgList.find((org) => org.id == orgId);
    return res(
      ctx.json({
        info: orgList[0],
      })
    );
  }),
  rest.get("/mc/project/list/org?orgId=:orgId", (req, res, ctx) => {
    const id = req.params.orgId;
    console.log(id);
    return res(
      ctx.json({
        list: projectList,
      })
    );
  }),
  rest.get("/mc/project/detail?projectId=:projectId", (req, res, ctx) => {
    const id = req.params.orgId;
    return res(
      ctx.json({
        detail: projectList[0],
      })
    );
  }),
  rest.get("/mc/agent/list", (req, res, ctx) => {
    return res(
      ctx.json({
        list: agentList,
      })
    );
  }),
  rest.get("/mc/agent/manage/info", (req, res, ctx) => {
    return res(
      ctx.json({
        info: agentList[0],
      })
    );
  }),
  rest.get("/mc/project/manage/list", (req, res, ctx) => {
    return res(
      ctx.json({
        list: projectList,
      })
    );
  }),
  rest.get("/mc/project/list/all", (req, res, ctx) => {
    return res(
      ctx.json({
        list: projectList,
      })
    );
  }),
  rest.get("/mc/org/manage/roles?orgId=", (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          isMember: true,
          isAdmin: true,
        },
      })
    );
  }),
  rest.get("/mc/org/manage/list", (req, res, ctx) => {
    return res(
      ctx.json({
        list: orgList,
      })
    );
  }),
];
