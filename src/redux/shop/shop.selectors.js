import { createSelector } from 'reselect';

// get shop reducer
const selectShop = state => state.shop;

// get collections state from shop reducer
export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

// get collections obj value -> array  (CollectionsOverview)
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => 
        collections ? Object.keys(collections).map(key => collections[key]) : []
)                   // or  Object.values(collections)   value array


// pass url params(string value) -> collections state obj -> get corresponding obj (hats)
export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections ? collections[collectionUrlParam] : null
)   // (CollectionPage)


// create loading state > pending (CollectionOverview)
export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

// create loading state > collections finish loaded (null / obj)  (CollectionPage)
export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)