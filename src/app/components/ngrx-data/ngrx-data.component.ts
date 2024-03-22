import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import {
    NgrxDataService
} from "../../service/ngrx-data.service";
import {
    catchError,
    Subject,
    takeUntil
} from "rxjs";
import {
    PostModel
} from "../../models/post.model";
import {
    load
} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-file-loader";

@Component({
    selector: 'app-ngrx-data',
    templateUrl: './ngrx-data.component.html',
    styleUrls: ['./ngrx-data.component.css']
})
export class NgrxDataComponent implements OnInit, OnDestroy {

    destroy$ = new Subject();
    postList!: PostModel[];

    constructor(private ngrxDataService: NgrxDataService) {}

    ngOnInit(): void {
        this.initializeSubscription();
    }

    initializeSubscription() {
        this.ngrxDataService.loaded$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            if (!res)
                this.getPostList();
            else {
                // * get the data from the store instead of making an api call every time
                this.ngrxDataService.entities$.subscribe((res) => {
                    if (res) {
                        this.postList = res;
                    }
                });
            }
        });
    }

    getPostList() {
        this.ngrxDataService.getAll().pipe(takeUntil(this.destroy$)).subscribe((res) => {
            this.postList = res;
        });
    }

    addNewPost() {
        this.ngrxDataService.add(this.postList[Math.floor(Math.random() * this.postList.length)]).subscribe((res) => {
                // TODO here what ever we can do after api call is success
            },
            catchError(err => err))
    }

    deletePost(postId: number) {
        this.ngrxDataService.delete(postId);
    }

    updatePost(post: PostModel) {
        const updatedPost = {
            ...post,
            title: `${post.title} UPDATED!!!!!`
        };

        const postData = {
            ...updatedPost,
            id: updatedPost.id
        }
        this.ngrxDataService.update(updatedPost).subscribe((res) => {
            console.log(res);
            console.log(this.ngrxDataService)
        }, (err) => {
            console.log("Caught in error------------------>", err);
        });
    }

    ngOnDestroy() {
        this.destroy$.complete();
        this.destroy$.next(null);
    }

}
