import {
  createAction, createActionGroup, emptyProps,
  props
} from "@ngrx/store";
import {
    PostModel
} from "../../models/post.model";


// export const getAllPost = createAction('[Ngrx Store] Get all post');

export const getAllPostSuccess = createAction('[Ngrx Store] Get All Post Success', props < {
    posts: PostModel[]
} > ());

export const removePost = createAction('[Ngrx Store] Remove post', props < {
    postId: number
} > ());

export const removePostSuccess = createAction('[Ngrx Store] Remove Post Success', props < {
    postId: number
} > ());

export const updatePost = createAction('[Ngrx Store] UPDATE Post', props < {
    updatedPost: PostModel
} > ());

export const updatePostSuccess = createAction('[Ngrx Store] UPDATE Post Success', props < {
    postChanges: PostModel
} > ());

export const addNewPost = createAction('[Ngrx Store] ADD Post', props < {
    newPost: PostModel
} > ());

export const addNewPostSuccess = createAction('[Ngrx Store] ADD Post Success', props < {
    newPost: PostModel
} > ());


export const postActionGroup = createActionGroup({
  source: 'Post',
  events: {
    'getAllPost': emptyProps(), // * action without props
    'getAllPostSuccess': props<{ posts: PostModel[] }>(),
    'removePost': props<{postId: number}>(),
    'removePostSuccess': props<{postId: number}>(),
    'updatePost': props<{updatedPost: PostModel}>(),
    'updatePostSuccess': props<{postChanges: PostModel}>(),
    'addNewPost': props<{newPost: PostModel}>(),
    'addNewPostSuccess': props<{newPost: PostModel}>()
  }
})
