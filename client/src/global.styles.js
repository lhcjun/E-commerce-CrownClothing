import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    /* from App.css */
    body {
        font-family: 'Open Sans Condensed';
        padding: 20px 40px;
        /* TB LR */
        
        @media screen and (max-width: 800px){
            padding: 10px;
        }
    }

    /* header options */
    a {
        text-decoration: none;
        color: inherit;
    }

    * {
        box-sizing: border-box;
    }
`;
