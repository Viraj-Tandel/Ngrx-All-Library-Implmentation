import {
    Injectable
} from "@angular/core";
import {
    Actions,
    createEffect,
    ofType
} from "@ngrx/effects";
import {
    ApiService
} from "../../service/api.service";
import {
    catchError,
    EMPTY,
    map,
    mergeMap
} from "rxjs";
import * as ProductAction from "../action/product.action";
import {
    updateProductSuccess
} from "../action/product.action";


@Injectable()
export class ProductEffect {

    constructor(private action$: Actions, private apiService: ApiService) {}

    getProducts$ = createEffect(() => this.action$.pipe(
        ofType(ProductAction.getAllProduct),
        mergeMap(() => this.apiService.getProductList().pipe(
            map((products) => ProductAction.getAllProductSuccess({
                products: products.products
            })),
            catchError(() => EMPTY)
        ))
    ));

    deleteProduct$ = createEffect(() => this.action$.pipe(
        ofType(ProductAction.removeProduct),
        mergeMap((actionPayload) => this.apiService.deleteProduct(actionPayload.productId).pipe(
            map((productResp) => ProductAction.removeProductSuccess({
                product: productResp
            })),
            catchError(() => EMPTY)
        ))
    ));

    updateProduct$ = createEffect(() => this.action$.pipe(
        ofType(ProductAction.updateProduct),
        mergeMap((updatedPayload) => this.apiService.updateProduct(updatedPayload.product).pipe(
            map((response) => ProductAction.updateProductSuccess({
                updatedProduct: updatedPayload.product
            })),
            catchError(() => EMPTY)
        ))
    ));

    addNewProduct$ = createEffect(() => this.action$.pipe(
        ofType(ProductAction.addNewProduct),
        mergeMap((product) => this.apiService.addNewProduct(product.newProduct).pipe(
            map((productResp) => ProductAction.addNewProductSuccess({
                newProduct: product.newProduct
            })),
            catchError(() => EMPTY)
        ))
    ));
}
