interface ILinkListType {
  type: string;
  url: string;
}

export interface IProjectType {
  id: number;
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
export interface ICommunityType {
  id: number;
  postType: string;
  category: string;
  memberId: number;
  viewCount: number;
  modifiedDate: string;
  title: string;
  content: string;
  hashTags: { hashTagId: number; hashTag: string }[];
}
export interface IDeadLineType {
  id: number;
  postType: string;
  category: string;
  title: string;
  content: string;
  modifiedDate: string;
  techStacks: { techStackId: number; techStack: string; iconUrl: string }[];
}
