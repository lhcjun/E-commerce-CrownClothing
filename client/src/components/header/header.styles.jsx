import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const HeaderContainer = styled.nav`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between; /* logo & options */
    margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    margin: 25px;   /* padding */
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;  /* each option */
    align-items: center;
    justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`;