import {
    postReducer
} from "../reducer/post.reducer";
import {
    routerReducer
} from "@ngrx/router-store";
import {
    productReducer
} from "../reducer/product.reducer";

export const GlobalAppState = {
    post: postReducer,
    product: productReducer,
    router: routerReducer
}
