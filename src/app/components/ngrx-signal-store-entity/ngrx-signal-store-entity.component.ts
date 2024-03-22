import {Component, computed, inject} from '@angular/core';
import {PostModel} from "../../models/post.model";
import {Todo} from "../../models/todo.model";
import {getState, patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {removeEntity, setAllEntities, updateEntity, withEntities} from "@ngrx/signals/entities";
import {ApiService} from "../../service/api.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {catchError, EMPTY, pipe, switchMap, tap} from "rxjs";
import {state} from "@angular/animations";
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";

export interface TodoState {
    isLoaded: boolean;
    completed: Todo[];
    unCompleted: Todo[];
}

// ! FACING ONE PROBLEM HERE WHEN THE API CALL METHODS GET COMPLETED HOW TO IDENTIFY IN COMPONENT
export const todoInitialState: TodoState = {
    isLoaded: false,
    completed: [],
    unCompleted: []
}

export const todoStore = signalStore(
    withState < TodoState > (todoInitialState),
    withComputed(({
        isLoaded,
        completed,
        unCompleted
    }) => ({
        // isLoaded: computed(() => isLoaded())
        completedList: computed(() => completed().filter((todo) => todo.completed).length),
        unCompletedList: computed(() => unCompleted().filter((todo) => !todo.completed).length)
    })),
    withEntities < Todo > (),
    withMethods((store) => {
        const apiService = inject(ApiService)
        return {
            loadTodo: rxMethod < void > (
                pipe(
                    switchMap(() => {
                        return apiService.getTodoList().pipe(
                            tap((todoResp) => {
                                patchState(store, setAllEntities(todoResp.todos));
                                patchState(store, {
                                    isLoaded: true,
                                    completed: store.entities().filter((todo) => todo.completed),
                                    unCompleted: store.entities().filter((todo) => !todo.completed)
                                })
                                // console.log("Entity Map----->", store.entityMap()); // {1: {first todo}, 2: {second todo} }
                            })
                        )
                    })
                )
            ),
            removeTodo: rxMethod < number > (
                pipe(
                    switchMap((todoId) => {
                        return apiService.deleteTodo(todoId).pipe(
                            tap((res) => {
                                if (res) {
                                    patchState(store, removeEntity(todoId))
                                    patchState(store, {
                                        completed: store.entities().filter((todo) => todo.completed),
                                        unCompleted: store.entities().filter((todo) => !todo.completed)
                                    });
                                }
                            }),
                            catchError(() => EMPTY)
                        )
                    })
                )
            ),
            markCompleteTodo: rxMethod < Todo > (
                pipe(
                    switchMap((todo) => {
                        return apiService.updateTodo(todo).pipe(
                            tap((res) => {
                                // @ts-ignore
                                patchState(store, updateEntity({
                                    id: todo.id,
                                    changes: todo
                                }));
                                patchState(store, {
                                    completed: store.entities().filter((todo) => todo.completed),
                                    unCompleted: store.entities().filter((todo) => !todo.completed)
                                });
                            })
                        )
                    })
                )
            )
        }
    }),
    withHooks({
        onInit(store) {
            store.loadTodo();
        }
    })
)
@Component({
    selector: 'app-ngrx-signal-store-entity',
    templateUrl: './ngrx-signal-store-entity.component.html',
    styleUrls: ['./ngrx-signal-store-entity.component.css'],
    providers: [todoStore]
})
export class NgrxSignalStoreEntityComponent {
    todoStore = inject(todoStore);

    constructor() {}

    removeTodo(todoId: number) {
        // ! FACING ONE PROBLEM HERE WHEN THE API CALL METHODS GET COMPLETED HOW TO IDENTIFY IN COMPONENT
        this.todoStore.removeTodo(todoId);
    }

    markAsComplete(todo: Todo) {
        // patchState(this.todoStore,updateEntity({id: todo.id,changes: {...todo,completed: true}}))
        this.todoStore.markCompleteTodo({
            ...todo,
            completed: true
        });
    }

}
