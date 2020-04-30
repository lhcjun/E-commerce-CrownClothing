import React from 'react';
import { connect } from 'react-redux';
// import CustomButton from '../custom-button/custom-button.component';
import { addItemsAction } from '../../redux/cart/cart.actions';
import { CollectionItemContainer, ItemBackgroundImage, CollectionFooterContainer, NameContainer, PriceContainer, AddButton } from './collection-item.styles';
// import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return (
        <CollectionItemContainer>
            <ItemBackgroundImage  className='image' imageUrl={imageUrl} />
            <CollectionFooterContainer>
                <NameContainer>{ name }</NameContainer>
                <PriceContainer>{ price }</PriceContainer>
            </CollectionFooterContainer>
            <AddButton inverted onClick={() => addItem(item)}> 
                Add to cart 
            </AddButton>
        </CollectionItemContainer>
    )
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItemsAction(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);




// return (
//     <div className='collection-item'>
//         <div className='image'
//             style={{ backgroundImage: `url(${imageUrl})` }}
//         />
//         <div className='collection-footer'>
//             <span className='name'>{ name }</span>
//             <span className='price'>{ price }</span>
//         </div>
//         <CustomButton inverted onClick={() => addItem(item)} className='custom-button' > 
//             Add to cart 
//         </CustomButton>
//     </div>
// )