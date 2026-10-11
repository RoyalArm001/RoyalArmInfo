import {
  GET as sessionGet,
  POST as sessionPost,
  DELETE as sessionDelete,
} from "../../../royalarm-ai/app/api/session/route";

export const runtime = "nodejs";
export const GET = sessionGet;
export const POST = sessionPost;
export const DELETE = sessionDelete;
