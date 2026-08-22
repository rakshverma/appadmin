export interface userInfoType {
  isLoggedin: boolean;
  userInfo: {
    id: number;
    role_id: number;
    first_name: string;
    last_name: string;
    token: string;
    refreshToken: string;
  };
}
