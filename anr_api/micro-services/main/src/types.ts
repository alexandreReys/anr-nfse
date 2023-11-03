export interface IUser {
  organizationId: string;
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImgUrl: string;
  role: string;
};

export interface IService {
  organizationId: string;
  id: string;
  description: string;
  price: number;
  additionalRemarks: string;
};
