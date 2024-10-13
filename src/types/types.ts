import { Session } from "express-session";

export interface ExtSession extends Session {
  username?: string;
}