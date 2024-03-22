import {
    Component,
    effect,
    OnDestroy,
    OnInit,
    Signal,
    signal,
    WritableSignal
} from '@angular/core';
import {
    NgrxComponentStore
} from "./component.store";
import {
    Subject,
    takeUntil
} from "rxjs";
import {
    MatchModel
} from "../../models/match.model";
import {
    ApiService
} from "../../service/api.service";

@Component({
    selector: 'app-ngrx-comp-store',
    templateUrl: './ngrx-comp-store.component.html',
    styleUrls: ['./ngrx-comp-store.component.css'],
    providers: [NgrxComponentStore]
})
export class NgrxCompStoreComponent implements OnInit, OnDestroy {

    destroy$ = new Subject();
    matchList: WritableSignal < MatchModel[] > = signal([]);
    constructor(private readonly componentStore: NgrxComponentStore, private apiServer: ApiService) {}

    ngOnInit(): void {
        this.initializeSub();
        this.initializeComponent();
    }

    initializeSub() {
        this.componentStore.matches$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            if (res)
                this.matchList.set(res);
        })
    }

    initializeComponent() {
        this.getMatchList();
        // Other necessary stuff we can do like creating formControls etc.
    }

    getMatchList() {
        this.componentStore.getMatchList();
    }

    addNewMatch() {
        const matchPayload = new MatchModel();
        matchPayload.matchType = 'Test';
        matchPayload.date = new Date().toLocaleDateString();
        matchPayload.name = 'INDIA vs AUSTRALIA';
        matchPayload.status = 'Not Started';
        matchPayload.dateTimeGMT = new Date().getTime().toString();
        matchPayload.venue = 'Vankhede Stadium, Mumbai';
        matchPayload.teams = ['India', 'Australia'];
        this.componentStore.addMatchHelper(matchPayload); // dispatching an action
    }

    deleteMatch(matchId: string) {
        this.componentStore.removeMatchHelper(matchId);
    }


    ngOnDestroy() {
        this.destroy$.next(null);
        this.destroy$.complete();
    }

}
