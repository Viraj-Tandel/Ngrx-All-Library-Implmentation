import {
    createAction,
    props
} from "@ngrx/store";
import {
    ProductModel
} from "../../models/product.model";


export const getAllProduct = createAction('[Ngrx Entity] Get All Products');

export const getAllProductSuccess = createAction('[Ngrx Entity] GET Product Success', props < {
    products: ProductModel[]
} > ());

export const removeProduct = createAction('[Ngrx Entity] Delete Product', props < {
    productId: number
} > ());

export const removeProductSuccess = createAction('[Ngrx Entity] Remove Product Success', props < {
    product: ProductModel
} > ());

export const updateProduct = createAction('[Ngrx Entity] UPDATE Product', props < {
    product: ProductModel
} > ());

export const updateProductSuccess = createAction('[Ngrx Entity] UPDATE Product Success', props < {
    updatedProduct: ProductModel
} > ());

export const addNewProduct = createAction('[Ngrx Entity] ADD Product', props < {
    newProduct: ProductModel
} > ());

export const addNewProductSuccess = createAction('[Ngrx Entity] ADD Product Success', props < {
    newProduct: ProductModel
} > ());
