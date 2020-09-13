import { User } from "./models";
import { DocumentType } from '@typegoose/typegoose';

declare global {
    namespace Express {
        export interface Request {
            user?: DocumentType<User>
        }
    }
}