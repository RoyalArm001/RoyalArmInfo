import { POST as chatPost } from "../../../royalarm-ai/app/api/chat/route";

export const runtime = "nodejs";
export const maxDuration = 60;
export const POST = chatPost;
