import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostState} from "../state/post.state";


export const selectPostState = createFeatureSelector<PostState>('post');

export const selectAllPosts = createSelector(selectPostState, (post) =>
  post.posts
);

export const selectPostLoad = createSelector(selectPostState, (post) => post.postsLoaded);
