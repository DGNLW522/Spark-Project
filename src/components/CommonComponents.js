import styled from "styled-components";

export const FluidContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    padding: 1em;       
`;

export const Container = styled.div`
    display: flex; 
    flex-direction: ${(props) => props.flexDirection ? props.flexDirection : "column"}; 
    justify-content: ${(props) => props.justifyContent ? props.justifyContent : "center"}; 
    align-items: ${(props) => props.alignItems ? props.alignItems : "flex-start"};
    width: ${(props) => props.disableFullWidth ? "initial" : "100%"};
    padding: 1em;   
`;

export const ContainerInline = styled.div`
    flex: 1 1 0;
    display: inline-flex; 
    flex-direction: column;
    Justiry-content: center; 
    align-items: flex-start; 
    padding: 1em; 
    text-align: left;
`;

export const FlecRow = styled.div`
    display: flex; 
    Justify-contant: center; 
    align-items: flex-start; 
    padding: 1em 5em; 
`;

export const Button = styled.button`
    background-color: ${(props) => {
        switch (props.color) {
            case "danger":
                return props.theme.primary.danger;
            case "secondary":
                return props.theme.secondary.main;
            default:
                return props.theme.primary.main;
        }
    } } ;
    color: ${(props) => props.theme.primary.textColor}; 
    font-size:  ${(props) => props.size ? props.size : 1}em; 
    padding: 0.25em 1em; 
    border: 0; 
    border-radius: 0.5em; 
    cursor: pointer; 
    margin: 1em;
    
    ${(props) => props.rounded ? "border-radius: 50%; padding: 0.5em;" : ""}
    
    :hover { 
        background-color: ${(props) => {
            switch (props.color) {
                case "danger":
                    return props.theme.primary.dangerDark;
                case "secondary":
                    return props.theme.secondary.dark;
                default:
                    return props.theme.primary.dark;
            }
        }}
    }
        
`;

export const Select = styled.select`
    height: 35px; 
    background: white; 
    color: gray; 
    padding: 0.5em; 
    font-size: 0.8em; 
    border: 2px solid ${(props)=>props.theme.secondary.light}; 
    border-radius: 0.5em; 
    margin-left: lem; 
    option { 
        color: black; 
        background: white; 
        display: flex; 
        white-space: pre; 
        min-height: 20px; 
        padding: 0px 2px 1px;
    }

`;