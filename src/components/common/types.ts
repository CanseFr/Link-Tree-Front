export interface BranchsType {
  createdAt: string;
  id: number;
  name_network: string;
  pathId: number;
  updatedAt: string;
  url_network: string;
}

export interface PathType {
  id: number;
  createdAt: string;
  bio: string;
  updatedAt: string;
  url_owner: string;
  userId: number;
  branchs: BranchsType[];
}

export interface UserPathsBranchs {
  createdAt: string;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  path: PathType;
  role: string;
  updatedAt: string;
}
