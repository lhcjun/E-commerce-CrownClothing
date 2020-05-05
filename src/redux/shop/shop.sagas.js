import { takeLatest, call, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import ShopActionTypes from './shop.types';

// query database - async action in generator function
export function* fetchCollectionsAsync() {
    try{
        // QueryReference > collection reference
        const collectionRef = firestore.collection("collections");
        // API call > get actual data(collections array snapshot) from firebase
        const snapshot = yield collectionRef.get();
        const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        // dispatch
        yield put(fetchCollectionsSuccess(collectionMap))
    }catch(error){
        yield put(fetchCollectionsFailure(error.message))
    }
}

// base saga - generator function
export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_PENDING, fetchCollectionsAsync)
}
