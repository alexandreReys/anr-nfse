export interface UserData {
  id: string;
  wixId?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  avatar: string;
  avatarType: string;
  role?: string;
};

export interface PropsData {
  id: string;
  worldId: string;
  ueIdentifier: string;
  name: string;
  previewImage: string;
  position: number[];
  rotation: number[];
  size: number[];
  assetUrl: string;
  mediaType: string;
};

export interface GuestData {
  id: string;
  eventId: string;
  worldId: string;
  userId: string;
  confirmed: number;
  role: string;
};
