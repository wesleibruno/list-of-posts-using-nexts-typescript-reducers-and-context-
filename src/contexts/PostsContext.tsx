import { PostActions, postReducer } from "@/reducers/postReducer";
import { Post } from "@/types/Post";
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";

const STORAGE_KEY = "postContextContent";
type PostContextType = {
  posts: Post[];
  dispatch: Dispatch<PostActions>;
};

export const PostContext = createContext<PostContextType | null>(null);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, dispatch] = useReducer(
    postReducer,
    JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  return (
    <PostContext.Provider value={{ posts, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
