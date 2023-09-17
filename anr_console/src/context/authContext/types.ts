export type User = {
  email: string;
  name: string;
  password: string;
  avatar_url: string;
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
