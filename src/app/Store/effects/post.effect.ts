import {
    Actions,
    createEffect,
    ofType
} from "@ngrx/effects";
import {
    Injectable
} from "@angular/core";
import * as PostAction from "../action/post.action"
import {
    PostModel
} from "../../models/post.model";
import {
    ApiService
} from "../../service/api.service";
import {
    catchError,
    EMPTY,
    map,
    mergeMap
} from "rxjs";
import {postActionGroup} from "../action/post.action";

@Injectable()
export class PostEffects {

    constructor(private action$: Actions, private apiService: ApiService) {}

    loadPost$ = createEffect(() => this.action$.pipe(
        ofType(postActionGroup.getAllPost),
        mergeMap(() => this.apiService.getPostList().pipe(
            map((posts) => postActionGroup.getAllPostSuccess({
                posts: posts
            })),
            catchError(() => EMPTY)
        ))
    ));

    removePost$ = createEffect(() => this.action$.pipe(
        ofType(PostAction.removePost),
        mergeMap((action) => this.apiService.deletePost(action.postId).pipe(
            map(() => PostAction.removePostSuccess({
                postId: action.postId
            })),
            catchError(() => EMPTY)
        ))
    ));

    updatePost$ = createEffect(() => this.action$.pipe(
        ofType(PostAction.updatePost),
        mergeMap((payload) => {
            return this.apiService.updatePost(payload.updatedPost).pipe(
                map((response) => PostAction.updatePostSuccess({
                    postChanges: payload.updatedPost
                })),
                catchError(() => EMPTY)
            )
        })
    ));

    addNewPost$ = createEffect(() => this.action$.pipe(
        ofType(PostAction.addNewPost),
        mergeMap((payload) => this.apiService.addNewPost(payload.newPost).pipe(
            map((response) => PostAction.addNewPostSuccess({
                newPost: response
            })),
            catchError(() => EMPTY)
        ))
    ));


}
