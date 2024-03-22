import {
    ComponentStore
} from "@ngrx/component-store";
import {
    MatchModel
} from "../../models/match.model";
import {
    ApiService
} from "../../service/api.service";
import {
    catchError,
    EMPTY,
    Observable,
    tap
} from "rxjs";
import {
    Injectable
} from "@angular/core";


export interface MatchState {
    matchList: MatchModel[];
}

export const initialMatchState: MatchState = {
    matchList: []
}

@Injectable()
export class NgrxComponentStore extends ComponentStore < MatchState > {

    matches$: Observable < MatchModel[] > = this.select((state) => state.matchList);

    constructor(private apiService: ApiService) {
        super(initialMatchState);
    }


    getMatchList() {
        return this.effect(() => {
            return this.apiService.getMatchList().pipe(
                tap((matches) => {
                    let currentState;
                    this.state$.subscribe((res) => currentState = res.matchList);
                  this.patchState({
                        matchList: [...matches.data]
                    })
                }),
                catchError(() => EMPTY)
            )
        });
    }

    removeMatchHelper(matchId: string) {
        return this.effect(() => {
            return this.apiService.fakeApiCall().pipe(
                tap((response) => {
                    this.removeMatch(matchId);
                })
            )
        })
    }

    addMatchHelper(matchPayload: MatchModel) {
        return this.effect(() => {
            return this.apiService.fakeApiCall().pipe(
                tap(() => this.addMatch(matchPayload)),
                catchError(() => EMPTY)
            )
        });
    }

    // * updater for adding new match
    addMatch = this.updater((state, payload: MatchModel) => {
        return {
            ...state,
            matchList: [...state.matchList, payload]
        }
    });

    // * updater for remove match
    removeMatch = this.updater((state, removeId: string) => {
        return {
            ...state,
            matchList: state.matchList.filter((match) => match.id !== removeId)
        }
    });
}
