import {createFeatureSelector, createSelector} from "@ngrx/store";
import {productEntityAdapter, ProductState} from "../state/product.state";
import {GlobalAppState} from "../state/app.state";


export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectProducts = createSelector(selectProductState, (state) => productEntityAdapter.getSelectors().selectAll(state));
