export type StringMap = {
  [key: string]: string;
};

export type Recipe = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  content: string;
  likes: string[];
};

export type CurrentUser = {
  _id: string;
  email: string;
};

export type AuthContextValue = {
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: CurrentUser) => void;
  logout: () => void;
};
