import { rest } from "msw";
import { Agent, Org } from "../types/user";
import { Project } from "../types/project";

let orgList: Org[] = [
  {
    id: "1",
    name: "test",
    description: "test",
    slogan: "slogan",
    avatarUrl: "public/images/watermelon",
    certification: "school",
    memberCount: 1,
    projectCount: 1,
  },
];
let agentList: Agent[] = [
  {
    id: "1",
    userId: "1",
    name: "test",
    description: "test",
    avatarUrl: "",
    projectCount: 0,
    showContact: true,
    email: "1@1",
    phone: "111",
    interested: true,
    displayOrgId: "1",
    readCount: 99,
    orgInfo: {
      id: "1",
      name: "test",
      description: "test",
      slogan: "slogan",
      avatarUrl: "",
      certification: "school",
      memberCount: 0,
      projectCount: 0,
    },
  },
];
let projectList: Project[] = [
  {
    id: "1",
    title: "aaa",
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
    tags: ["test"],
    content: "这是一个项目",
  },
];

export const handlers = [
  rest.post("/user/userid", (req, res, ctx) => {
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
];
