import {
    ProductModel
} from "../../models/product.model";
import {
    createEntityAdapter,
    EntityState
} from "@ngrx/entity";
import {
    PostModel
} from "../../models/post.model";


export interface ProductState extends EntityState < ProductModel > {
    // products: ProductModel[];
    isLoaded: boolean;
}

export const productEntityAdapter = createEntityAdapter < ProductModel > ();


export const productInitialState: ProductState = productEntityAdapter.getInitialState({
    isLoaded: false
});
