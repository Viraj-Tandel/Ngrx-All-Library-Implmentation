import {
    createFeatureSelector,
    createSelector
} from "@ngrx/store";
import {
    RouterReducerState
} from "@ngrx/router-store";
import {
    RouterStateModel
} from "../router/custom-serializer";

const getRouterState =
    createFeatureSelector < RouterReducerState < RouterStateModel >> ("router");

export const getRouterInfo = createSelector(getRouterState, (state) => {
    return state.state.params["id"];
});

export const getQueryParams = createSelector(getRouterState, (state) => {
    return state.state.queryParams;
});
