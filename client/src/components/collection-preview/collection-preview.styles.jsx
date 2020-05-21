import styled from 'styled-components';

export const CollectionPreviewContainer = styled.div`
    display: flex;
    flex-direction: column; /* each preview */
    margin-bottom: 30px;

    @media screen and (max-width: 800px) {
        align-items: center;
    }
`;

export const TitleContainer = styled.h1`
    font-size: 28px;
    margin-bottom: 25px;

    &:hover {
        color: grey;
    }
`;

export const PreviewContainer = styled.div`
    display: flex;   /* preview > each item (on same row) */
    justify-content: space-between; /* each item */

    @media screen and (max-width: 800px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 35px;
        column-gap: 20px;
    }

    @media screen and (max-width: 500px) {
            grid-template-columns: 1fr;
            row-gap: 25px;
    }
`;