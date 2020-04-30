import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';

export const CollectionItemContainer = styled.div`
    width: 22vw;
    display: flex;
    flex-direction: column; /* img & footer */
    height: 350px;
    align-items: center;
    position: relative; /* for button absolute */

    &:hover {
        .image {
            opacity: 0.8;
        }

        button {
            opacity: 0.85;
            display: flex; /* to display */
        }
    }
`;


export const ItemBackgroundImage = styled.div`
    width: 100%;
    height: 95%;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
    background-image: ${ ({imageUrl}) => `url(${imageUrl})`}
`;

export const CollectionFooterContainer = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between; /* name & price */
    font-size: 18px;
`;


export const NameContainer = styled.span`
    width: 90%;  /* take majority of space */
    margin-bottom: 15px;
`;
export const PriceContainer = styled.span`
    width: 10%;
    /* text-align: right; */
`;

export const AddButton = styled(CustomButton)`
    width: 80%;
    min-width: 30px; /* shrink the window */
    opacity: 0.7;
    position: absolute; /* bottom */
    top: 255px;
    display: none;
`;