import { takeLatest, call, put } from 'redux-saga/effects';
import ShopActionTypes from '../shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from '../shop.actions';
import { fetchCollectionsAsync, fetchCollectionsStart } from '../shop.sagas';

// fetchCollectionsStart > fetchCollectionsAsync
describe('fetchCollectionsStart saga', () => {
    it('should trigger on FETCH_COLLECTIONS_PENDING', () => {
        const generator = fetchCollectionsStart();
        expect(generator.next().value).toEqual(
            takeLatest(ShopActionTypes.FETCH_COLLECTIONS_PENDING, fetchCollectionsAsync)
        );
    });
});

describe('fetchCollectionsAsync saga', () => {
    const generator = fetchCollectionsAsync();

    it('should call firestore collection', () => {
        const getCollection = jest.spyOn(firestore, 'collection');  // firestore[collection]
        generator.next();
        expect(getCollection).toHaveBeenCalled();
    });

    it('should call convertCollectionsSnapshotToMap', () => {
        const mockSnapshot = {};    
        expect(generator.next(mockSnapshot).value).toEqual(
            call(convertCollectionsSnapshotToMap, mockSnapshot)
        );
    });

    it('should fire fetchCollectionsSuccess if collectionsMap is successful', () => {
        const mockCollectionMap = { hats: { id: 1 } };
        expect(generator.next(mockCollectionMap).value).toEqual(
            put(fetchCollectionsSuccess(mockCollectionMap))
        );
    });

    it('should fire fetchCollectionsFailure if get collection fails', () => {
        const newGenerator = fetchCollectionsAsync();
        newGenerator.next();
        expect(newGenerator.throw({ message: 'error' }).value).toEqual(
            put(fetchCollectionsFailure('error'))
        );
    });
});