import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import {
    PostModel
} from "../../models/post.model";
import {
    Subject,
    takeUntil
} from "rxjs";
import {
    props,
    Store
} from "@ngrx/store";
import {
    PostState
} from "../../Store/state/post.state";
import {
    selectAllPosts,
    selectPostLoad
} from "../../Store/selector/post.selector";
import {
  postActionGroup,
  removePost
} from "../../Store/action/post.action";
import * as PostAction from "../../Store/action/post.action";
import {
    PostsStore
} from "../ngrx-signal-store/ngrx.signal-store";

@Component({
    selector: 'app-ngrx-store',
    templateUrl: './ngrx-store.component.html',
    styleUrls: ['./ngrx-store.component.css']
})
export class NgrxStoreComponent implements OnInit, OnDestroy {
    postList!: PostModel[];
    isPostLoaded!: boolean;
    destroy$ = new Subject();

    constructor(private store: Store < PostState > ) {}

    ngOnInit(): void {
        this.initializeSubscription();
        this.fetchPostList();
    }

    initializeSubscription() {
        this.store.select(selectAllPosts).pipe(takeUntil(this.destroy$)).subscribe((res) => {
            if (res) {
                this.postList = res;
            }
        });

        this.store.select(selectPostLoad).pipe(takeUntil(this.destroy$)).subscribe((res) => {
            this.isPostLoaded = res;
        });
    }

    fetchPostList() {
        if (!this.isPostLoaded)
            this.store.dispatch(postActionGroup.getAllPost());
    }

    deletePost(postId: number) {
        this.store.dispatch(removePost({
            postId
        }));
    }

    updatePost(post: PostModel) {
        post = {
            ...post,
            title: `${post.title} UPDATED!!!!!!!`
        };
        this.store.dispatch(PostAction.updatePost({
            updatedPost: post
        }));
    }

    addNewPost() {
        let newPost = this.postList[Math.floor(Math.random() * this.postList.length)];
        this.store.dispatch(PostAction.addNewPost({
            newPost
        }))
    }

    ngOnDestroy(): void {
        this.destroy$.complete();
        // @ts-ignore
        this.destroy$.next();
    }
}
