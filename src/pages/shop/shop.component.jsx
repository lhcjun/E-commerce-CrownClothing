import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';


const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {

    state = {
        loading: true 
    };
    
    // collections array (snapshot docs obj) from firestore
    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        // QueryReference > collection reference
        const collectionRef = firestore.collection('collections');
        // listen to collectionRef update > get actual data(collections array snapshot)
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
            // Get collections obj data (converted from array)
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap)
            this.setState({ loading: false });
        })
    }

    componentWillUnmount(){
        this.unsubscribeFromSnapshot();
    }

    render(){
        const { match } = this.props;
        const { loading } = this.state;
        return(
            <div className='shop-page'>
                <Route 
                    exact path={`${match.path}`}    /* matching current path */
                    render={ props => <CollectionOverviewWithSpinner isLoading={loading} {...props} /> }
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={ props => <CollectionPageWithSpinner isLoading={loading} {...props} /> } 
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);

