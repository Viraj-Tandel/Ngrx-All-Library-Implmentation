import {
    Component,
    computed,
    inject
} from '@angular/core';;
import {
    PostsStore
} from "./ngrx.signal-store";

@Component({
    selector: 'app-ngrx-signal-store',
    templateUrl: './ngrx-signal-store.component.html',
    styleUrls: ['./ngrx-signal-store.component.css'],
    providers: [PostsStore]
})

export class NgrxSignalStoreComponent {
    readonly postStore = inject(PostsStore);

    constructor() {}

    deletePost(postId: number) {
        this.postStore.removePost(postId);
    }

    addNewPost() {
        this.postStore.addPost(this.postStore.fullPostList()[Math
            .floor(Math.random() * this.postStore
                .fullPostList().length)])
    }
}
