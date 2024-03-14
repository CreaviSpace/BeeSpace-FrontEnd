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
