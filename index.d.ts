declare module 'eslint-plugin-jest';
import 'express-session';

declare module 'express-session' {
    interface SessionData {
        username?: string;
    }
}