import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_PENDING
});

export const fetchCollectionsSuccess = collectionMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});


// async action > fetch firebase 'collections' 
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        // QueryReference > collection reference
        const collectionRef = firestore.collection("collections");
        dispatch(fetchCollectionsStart())

        // API call > get actual data(collections array snapshot) from firebase
        collectionRef
            .get()
            .then(snapshot => {
                // Get collections obj data (converted from array)
                const collectionMap = convertCollectionsSnapshotToMap(snapshot);
                dispatch(fetchCollectionsSuccess(collectionMap))
            })
            .catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
};