import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
*, *:before, *:after {
    box-sizing: border-box;
    padding: 0;
    margin: 0; 
    font-family: 'Audiowide', cursive;
    font-family: 'PT Sans', sans-serif;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
}
html, body {
    height: 100%;
}
`;