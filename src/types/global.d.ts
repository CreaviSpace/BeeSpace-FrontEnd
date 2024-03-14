interface ILinkListType {
  type: string;
  url: string;
}

export interface IProjectType {
  id: number;
  kind: string;
  postType: string;
  category: string;
  title: string;
  linkList: ILinkListType[];
  thumbnail: string;
  bannerContent: string;
}

export interface IRecruitType {
  id: number;
  postType: string;
  category: string;
  title: string;
  content: string;
  techStack: string;
  amount: number;
  now: number;
}
