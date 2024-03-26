interface ILinksType {
  linkType: string;
  url: string;
}

export interface IProjectType {
  id: number;
  postType: string;
  category: string;
  title: string;
  links: ILinksType[];
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

export interface IRecruitBody {
  category: string;
  amount: number;
  workDay: number;
  contact: string;
  contactWay: string;
  proceedWay: string;
  end: string;
  endFormat: string;
  title: string;
  content: string;
  positions: {
    position: string;
    amount: number;
    now: number;
  }[];
  techStacks: {
    tackStackId: number;
  }[];
}

export interface IProjectBody {
  category: string;
  memberDtos: {
    memberId: number;
    position: string;
  }[];
  title: string;
  content: string;
  techStackDtos: {
    techStackId: number;
  }[];
  field: string;
  linkDtos: {
    linkType: string;
    url: string;
  }[];
  thumbnail: string;
  bannerContent: string;
}

export interface ICommunityBody {
  category: string;
  title: string;
  content: string;
  hashTags: string[];
}

export interface IUniversalType {
  id: number;
  title: string;
  bannerContent: string;
  thumbnail: string;
  category: string;
  postType: string;
  links: { type: string; url: string }[];
}

export interface IquestionType {
  question: string;
  type: string;
  chiceItems: string[];
}
export interface ICommentContainerTypes {
  id: number;
  memberId: number;
  memberNickName: string;
  memberProfileUrl: string;
  modifiedDate: string;
  content: string;
}
