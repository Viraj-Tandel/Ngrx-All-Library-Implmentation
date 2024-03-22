import {
    createReducer,
    on
} from "@ngrx/store";
import {
    postInitialState
} from "../state/post.state";
import * as PostAction from "../action/post.action"
import {
    state
} from "@angular/animations";
import {postActionGroup} from "../action/post.action";


export const postReducer = createReducer(postInitialState,
    on(postActionGroup.getAllPostSuccess, (state, {
        posts
    }) => ({
        ...state,
        posts: posts,
        postsLoaded: true
    })),
    on(PostAction.removePostSuccess, (state, {
        postId
    }) => ({
        ...state,
        posts: state.posts.filter((post) => post.id !== postId)
    })),
    on(PostAction.updatePostSuccess, (state, {
        postChanges
    }) => {
        const updatedPostList = state.posts.map((post) => {
            if (post.id == postChanges.id)
                return postChanges
            return post;
        })
        return {
            ...state,
            posts: updatedPostList
        };
    }),
    on(PostAction.addNewPostSuccess, (state, {
        newPost
    }) => ({
        ...state,
        posts: [...state.posts, newPost]
    }))
);
