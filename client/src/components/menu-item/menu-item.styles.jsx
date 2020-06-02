import styled from 'styled-components';


export const MenuItemContainer = styled.div`
    /* size(state)  */
    height: ${({ size }) => size ? '380px' : '240px'};

    min-width: 30%;
    flex: 1 1 auto; /* being inner: flex-grow, flex-shrink, flex-basis */
    display: flex; /* being outer box */
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 0 7.5px 15px; /* T LR B */
    overflow: hidden; /* bg-img scale */

    &:hover {
        cursor: pointer;

        & .background-image {
            transform: scale(1.1);
            transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95); /* speed */
        }

        & .content {
            opacity: 0.9;
        }
    }

    &:first-child {
        margin-right: 7.5px;
    }

    &:last-child {
        margin-left: 7.5px;
    }


    @media screen and (max-width: 800px) {
        height: 200px;
    }
`;
MenuItemContainer.displayName = 'MenuItemContainer';


export const BackgroundImageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;

    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;
BackgroundImageContainer.displayName = 'BackgroundImageContainer';


export const ContentContainer = styled.div`
    height: 90px;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: white;
    opacity: 0.7;
    position: absolute;  /* so that won't sibling with bg-img */
`;


export const ContentTitle = styled.h1`
    font-weight: bold;
    margin: 0 0 6px;
    font-size: 22px;
    color: #4a4a4a;
`;

export const ContentSubtitle = styled.span`
    font-weight: lighter;
    font-size: 16px;
`;