import {PostModel} from "../../models/post.model";
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {ApiService} from "../../service/api.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {catchError, EMPTY, pipe, switchMap, tap} from "rxjs";

export interface ProductSignalState {
    posts: PostModel[];
    fullPostList: PostModel[];
    isLoaded: boolean;
}

export const PostsInitialState: ProductSignalState = {
    posts: [],
    fullPostList: [],
    isLoaded: false
}

export const PostsStore = signalStore(
    withState < ProductSignalState > (PostsInitialState),
    withComputed(({
        posts,
        isLoaded
    }) => ({
        isPostsFetched: computed(() => isLoaded()),
        postCount: computed(() => posts().length)
    })),
    withMethods((store, apiService = inject(ApiService)) => ({
        loadPost: rxMethod < void > (
            pipe(
                switchMap(() => {
                    return apiService.getPostList().pipe(
                        tap((posts) => {
                            patchState(store, {
                                posts: posts.slice(0, 10),
                                fullPostList: posts,
                                isLoaded: true
                            })
                        }),
                        catchError(() => EMPTY)
                    )
                })
            )
        ),
        removePost: rxMethod < number > (
            pipe(
                switchMap((postId) => {
                    return apiService.deletePost(postId).pipe(
                        tap((post) => patchState(store, {
                            posts: store.posts().filter((post) => post.id !== postId)
                        }))
                    )
                })
            )
        ),
        addPost: rxMethod < PostModel > (
            pipe(
                switchMap((newPost) => {
                    return apiService.addNewPost(newPost).pipe(
                        tap((post) => patchState(store, {
                            posts: [...store.posts(), post],
                            fullPostList: [...store.fullPostList(), newPost]
                        }))
                    )
                })
            )
        )
    })),
    withHooks({
        onInit(store) {
            store.loadPost()
        }
    })
);
