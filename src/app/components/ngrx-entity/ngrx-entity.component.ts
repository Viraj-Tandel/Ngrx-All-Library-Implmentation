import {
    Component,
    OnInit
} from '@angular/core';
import {
    ProductModel
} from "../../models/product.model";
import {
    Store
} from "@ngrx/store";
import {
    ProductState
} from "../../Store/state/product.state";
import {
    getAllProduct,
    removeProduct
} from "../../Store/action/product.action";
import * as ProductAction from "../../Store/action/product.action"
import {
    selectProducts
} from "../../Store/selector/product.selector";

@Component({
    selector: 'app-ngrx-entity',
    templateUrl: './ngrx-entity.component.html',
    styleUrls: ['./ngrx-entity.component.css']
})
export class NgrxEntityComponent implements OnInit {

    productList!: ProductModel[];
    constructor(private store: Store < ProductState > ) {}

    ngOnInit(): void {
        this.initializeSub();
        this.store.dispatch(getAllProduct());
    }

    initializeSub() {
        this.store.select(selectProducts).subscribe((res) => {
            if (res)
                this.productList = res;
        });
    }

    updateProduct(product: ProductModel) {
        product = {
            ...product,
            title: `${product.title} updated!!!!!!`
        };
        this.store.dispatch(ProductAction.updateProduct({
            product
        }));
    }

    deleteProduct(productId: number) {
        this.store.dispatch(removeProduct({
            productId
        }));
    }

    addNewProduct() {
        const newProduct = {
            ...this.productList[Math.floor(Math.random() * this.productList.length)]
        };
        newProduct.id = this.productList.length + 1;
        this.store.dispatch(ProductAction.addNewProduct({
            newProduct
        }));
    }
}
