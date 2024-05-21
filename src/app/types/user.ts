import { Email } from './email';

export interface User {
  id?: number;
  gender: string;
  fullname: string;
  email: string;
  password: string;
  username: string;
  emails?: Email[];
  drafts?: Email[];
}
