import {
    EntityDataModuleConfig,
    EntityMetadata,
    EntityMetadataMap
} from "@ngrx/data";


const entityMetadata: EntityMetadataMap = {
    Post: {
        entityDispatcherOptions: {
            optimisticUpdate: true
            // optimisticSaveEntities: false,
        }
    }
}

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata
}
