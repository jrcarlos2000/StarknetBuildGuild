export type SocialMediaInfo = {
  name: string;
  link: string;
  icon: any;
};

export type User = {
  image: string;
  description: string;
  joinDate: string;
  socialMedia: SocialMediaInfo[];
  name: string;
};
