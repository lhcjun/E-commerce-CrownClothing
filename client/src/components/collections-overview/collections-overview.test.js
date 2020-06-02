import React from 'react';
import { shallow } from 'enzyme';
import { CollectionsOverview } from './collections-overview.component';
import CollectionPreview  from '../collection-preview/collection-preview.component';


describe('CollectionsOverview', () => {
    const mockCollections = [ { id: 1 }, { id: 2 } ];
    const wrapper = shallow(<CollectionsOverview collections={mockCollections} />);

    it('should render CollectionsOverview component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render an equal number of CollectionPreview components as the collections prop', () => {
        expect(wrapper.find(CollectionPreview).length).toEqual(mockCollections.length);
    }); 
});