export type TUserRegistration = {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};
