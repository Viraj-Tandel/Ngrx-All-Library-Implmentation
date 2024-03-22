import {
    createReducer,
    on
} from "@ngrx/store";
import {
    productEntityAdapter,
    productInitialState,
    ProductState
} from "../state/product.state";
import * as ProductAction from "../action/product.action"

export const productReducer = createReducer(productInitialState,
    on(ProductAction.getAllProductSuccess, (state, {
        products
    }) => {
        return productEntityAdapter.setAll(products, {
            ...state,
            isLoaded: true
        }) // * in this way we can update other property of state along with entity update
    }),
    on(ProductAction.removeProductSuccess, (state, {
        product
    }) => {
        return productEntityAdapter.removeOne(product.id, state) // * BTS entityObj = {1: {}, 2: {}, 3: {}}; delete entityObj.3
    }),
    on(ProductAction.updateProductSuccess, (state, {
        updatedProduct
    }) => {
        return productEntityAdapter.updateOne({
            id: updatedProduct.id,
            changes: {
                ...updatedProduct
            }
        }, state);
    }),
    on(ProductAction.addNewProductSuccess, (state, {
        newProduct
    }) => {
        return productEntityAdapter.addOne(newProduct, state);
    })
);
