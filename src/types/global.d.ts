interface ILinksType {
  linkType: string;
  url: string;
}

export interface IBannerItem {
  id: number;
  postType: string;
  title: string;
  thumbnail?: string;
  category: string;
  bannerContent: string;
}

export interface IProjectType {
  id: number;
  postType: string;
  category: string;
  title: string;
  links?: ILinksType[];
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
    techStackId: number;
  }[];
}

export interface IProjectBody {
  category: string;
  memberDtos: {
    memberId: string;
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
  bannerContent?: string;
  content: string;
  contentsTitle: string;
  thumbnail: string;
  category: string;
  postType: string;
  links: { type: string; url: string }[];
}

export interface IQuestionType {
  questionId?: number;
  question: string;
  questionType: string;
  choiceItems: string[];
}

export interface ICommentContainerTypes {
  id: number;
  memberId: number;
  memberNickName: string;
  memberProfileUrl: string;
  modifiedDate: string;
  content: string;
}

export interface ITechStackType {
  techStackId: number;
  techStack: string;
  techStackIcon: string;
}

export interface IPositionsType {
  position: string;
  now: number;
  amount: number;
}

export interface IProfileType {
  memberIdTag: string;
  memberNickname: string;
  introduce: string;
  career: number;
  position: string[];
  profileUrl: string;
  message: string;
}

export interface IProfilePost {
  id: number;
  postType: string;
  category: string;
  title: string;
  links: {
    linkType: string;
    url: string;
  }[];
  thumbnail: string;
  bannerContent: string;
}

export interface IAnswerType {
  questionId: number;
  answer: string;
  selectedItems: {
    id: number;
  }[];
}

export interface IQuestionAnswerType {
  questionId: number;
  question: string;
  questionType: string;
  choiceItems: {
    id: number;
    item: string;
  }[];
}

export interface IAdminMemberType {
  id: number;
  loginId: string;
  memberEmail: string;
  memberName: string;
  memberNickname: string;
  loginType: string;
  role: string;
  idTag: string;
  memberPosition: string;
  memberCareer: number;
}

export interface IReportType {
  createdDate: string;
  modifiedDate: string;
  id: number;
  member: {
    createdDate: string;
    modifiedDate: string;
    id: string;
    loginId: string;
    memberEmail: string;
    memberName: string;
    memberNickname: string;
    profileUrl: string;
    loginType: string;
    role: string;
    memberIntroduce: string;
    expired: true;
    enabled: true;
    memberPosition: string;
    memberCareer: number;
    interestedStack: string[];
    roleKey: string;
  };
  category: SPAM;
  postType: PROJECT;
  postId: number;
  content: string;
  status: true;
}
