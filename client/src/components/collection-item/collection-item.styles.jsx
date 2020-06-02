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

    @media screen and (max-width: 800px) {
        width: 40vw;
        margin-left: auto;
        margin-right: auto;

        &:hover {
            .image {
                opacity: unset;
            } 

            button {
                opacity: unset;
            }
        }
    }

    @media screen and (max-width: 500px) {
        width: 80vw;
        height: 400px;
    }

    @media screen and (max-width: 360px) {
        height: 380px;
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
ItemBackgroundImage.displayName = 'ItemBackgroundImage';


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
NameContainer.displayName = 'NameContainer';


export const PriceContainer = styled.span`
    width: 10%;
    /* text-align: right; */
`;
PriceContainer.displayName = 'PriceContainer';


export const AddButton = styled(CustomButton)`
    width: 80%;
    min-width: 30px; /* shrink the window */
    opacity: 0.7;
    position: absolute; /* bottom */
    top: 255px;
    display: none;

    @media screen and (max-width: 800px) {
        display: block;
        opacity: 0.9;
        min-width: unset;
        padding: 0 10px;
    }

    @media screen and (max-width: 500px) {
        top: 300px;
    }

    @media screen and (max-width: 360px) {
        top: 285px;
    }
`;
AddButton.displayName = 'AddButton';