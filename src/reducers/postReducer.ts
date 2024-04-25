import { Post } from "@/types/Post";

type AddAction = { type: "add"; payload: { title: string; body: string } };
type EditAction = {
  type: "edit";
  payload: { id: number; title: string; body: string };
};
type DeleteAction = { type: "delete"; payload: { id: number } };

export type PostActions = AddAction | EditAction | DeleteAction;
export const postReducer = (posts: Post[], action: PostActions) => {
  switch (action.type) {
    case "add":
      return [
        ...posts,
        {
          id: posts.length,
          title: action.payload.title,
          body: action.payload.body,
        },
      ];
    case "edit":
      return posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            title: action.payload.title,
            body: action.payload.body,
          };
        }
        return post;
      });
    case "delete":
      return posts.filter((post) => post.id !== action.payload.id);
    default:
      return posts;
  }
};
