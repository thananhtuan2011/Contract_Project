export class AuthModel {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  response: string

  setAuth(auth: any) {
    this.accessToken = auth.accessToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
  }
}
