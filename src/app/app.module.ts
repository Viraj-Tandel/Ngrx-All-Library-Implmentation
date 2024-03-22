import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {provideStore, StoreModule} from "@ngrx/store";
import {GlobalAppState} from "./Store/state/app.state";
import {HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {PostEffects} from "./Store/effects/post.effect";
import {provideRouter, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {CustomSerializer} from "./Store/router/custom-serializer";
import {ReactiveFormsModule} from "@angular/forms";
import {ProductEffect} from "./Store/effects/product.effect";
import { NgrxCompStoreComponent } from './components/ngrx-comp-store/ngrx-comp-store.component';
import { HeaderComponent } from './components/header/header.component';
import { NgrxSignalStoreComponent } from './components/ngrx-signal-store/ngrx-signal-store.component';
import { NgrxSignalStoreEntityComponent } from './components/ngrx-signal-store-entity/ngrx-signal-store-entity.component';
import {EntityDataModule, EntityDataService} from "@ngrx/data";
import {entityConfig} from "./Store/ngrx data/entity-metadata";
import { NgrxDataComponent } from './components/ngrx-data/ngrx-data.component';
import {PostNgrxDataService} from "./service/post-ngrx-data.service";
import { NgrxEntityComponent } from './components/ngrx-entity/ngrx-entity.component';
import { NgrxStoreComponent } from './components/ngrx-store/ngrx-store.component';
import {postReducer} from "./Store/reducer/post.reducer";
import {productReducer} from "./Store/reducer/product.reducer";


const routes: Routes = [
  {
    path: 'ngrx-entity', component: NgrxEntityComponent,
  },
  {
    path: 'ngrx-store', component: NgrxStoreComponent
  },
  {
    path: 'component-store', component: NgrxCompStoreComponent
  },
  {
    path: 'signal-store', component: NgrxSignalStoreComponent
  },
  {
    path: 'signal-store-entity', component: NgrxSignalStoreEntityComponent
  },
  {
    path: 'ngrx-data', component: NgrxDataComponent
  },
  {
    path: '', redirectTo: 'ngrx-store', pathMatch: "full"
  },
]

@NgModule({
  declarations: [
    AppComponent,
    NgrxCompStoreComponent,
    HeaderComponent,
    NgrxSignalStoreComponent,
    NgrxSignalStoreEntityComponent,
    NgrxDataComponent,
    NgrxEntityComponent,
    NgrxStoreComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(GlobalAppState), // * recommended way of registration
    // * if we are not creating global app state then we need to register our state and reducer like below
    // StoreModule.forRoot({ post: postReducer, product: productReducer}),
    EffectsModule.forRoot([PostEffects,ProductEffect]),
    StoreDevtoolsModule.instrument({
    }),
    RouterOutlet,
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [
    PostNgrxDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private entityDataService: EntityDataService, private postNgrxDataService: PostNgrxDataService) {
    this.entityDataService.registerService('Post',postNgrxDataService);
  }
}
