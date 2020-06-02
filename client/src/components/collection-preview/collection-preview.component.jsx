import React from 'react';
import { Link } from 'react-router-dom';
import CollectionItem from '../collection-item/collection-item.component';
import { CollectionPreviewContainer, TitleContainer, PreviewContainer} from './collection-preview.styles';
// import './collection-preview.styles.scss';

export const CollectionPreview = ({ title, items, routeName}) => (
    <CollectionPreviewContainer>
        <Link to={`/shop/${routeName}`}>
            <TitleContainer>
                { title.toUpperCase() }
            </TitleContainer>
        </Link>
        <PreviewContainer>
            {items
                .filter((item, idx) => idx < 4)
                .map( item => (
                    <CollectionItem key={item.id} item={item} />
                ))
            }
        </PreviewContainer>
    </CollectionPreviewContainer>
)

export default CollectionPreview;