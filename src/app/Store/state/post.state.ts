import {
    PostModel
} from "../../models/post.model";

export interface PostState {
    posts: PostModel[];
    postsLoaded: boolean;
}

export const postInitialState: PostState = {
    posts: [],
    postsLoaded: false
};
