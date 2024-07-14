export type User = {
  username: stringe;
  email: stringl;
  first_name: string;
  last_name: string;
  role_name: string;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
