import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import Spinner from '../../components/spinner/spinner.component';

// code splitting > lazy component
const CollectionsOverviewContainer = lazy(() => import("../../components/collections-overview/collections-overview.container"));
const CollectionPageContainer = lazy(() => import("../collection/collection.container"));


export const ShopPage = ({ match, fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart()
  }, [fetchCollectionsStart]);  // componentDidMount

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route exact path={`${match.path}`}>    {/* matching current path  */}
          <CollectionsOverviewContainer />
        </Route> 
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </Suspense>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);