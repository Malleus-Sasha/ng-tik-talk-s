import { Login } from "./login";

export type Token = {
  user: Login;
  accessToken: string;
  refreshToken: string;
}
