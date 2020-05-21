import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const HeaderContainer = styled.nav`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between; /* logo & options */
    margin-bottom: 25px;

    @media screen and (max-width: 500px){
        padding: 10px;
    }
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    margin: 25px;   /* padding */

    @media screen and (max-width: 800px){
        width: 50px;
    }

    @media screen and (max-width: 700px){
        margin: 20px;
    }

    & > * {
        @media screen and (max-width: 600px){
            width: 45px;
        }

        @media screen and (max-width: 430px){
            width: 40px;
        }
    }

    @media screen and (max-width: 500px){
        margin: 15px;
        margin-top: 8px;
    }

    @media screen and (max-width: 430px){
        margin: 12px;
        margin-top: 2px;
    }

`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;  /* each option */
    align-items: center;
    justify-content: flex-end;

    @media screen and (max-width: 800px){
        width: 80%;
    }
`;

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
    white-space: nowrap;

    @media screen and (max-width: 450px){
        padding: 10px 10px;
    }

    @media screen and (max-width: 330px){
        padding: 10px 8px;
    }
`;