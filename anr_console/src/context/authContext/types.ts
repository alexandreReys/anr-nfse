export type User = {
  email: string;
  firstName: string;
  lastName: string;
  profileImgUrl: string;
  role: string;
  password: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null,
  signIn: (data: SignInData) => Promise<void>
}
