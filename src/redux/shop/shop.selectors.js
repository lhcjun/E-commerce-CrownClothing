import { createSelector } from 'reselect';

// get shop reducer
const selectShop = state => state.shop;

// get collections state from shop reducer
export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

// get collections obj value -> array  (for selectCollection - CollectionsOverview)
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)    // state obj    ->    key array        ->      value array


// pass url params(string value) -> collections state obj -> get corresponding obj (hats)
export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
)