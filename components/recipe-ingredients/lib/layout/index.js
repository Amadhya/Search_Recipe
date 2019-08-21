import styled, { css } from 'styled-components';
import {Row as FlexRow, Col as FlexCol} from 'react-styled-flexboxgrid';

export const Col=styled(FlexCol)`
    text-align: ${({align})=> align};
    ${({auto})=> auto && css `
        flex: 1;
    `};
    padding: ${(gap,gutter)=> `${gap}px ${gutter}px`};
    ${({margin})=> margin && css `
        margin: auto;
    `};
`;

export const Row=styled(FlexRow)`
    text-align: ${({align})=> align};
    ${({auto})=> auto && css `
        flex: 1;
    `};
    padding: ${(gap,gutter)=> `${gap}px ${gutter}px`};
    ${({alignItems})=> alignItems && css `
        align-items: ${alignItems};
    `};
    ${({justify})=> justify && css `
        justify-content: ${justify};
    `};
    flex-direction: ${({reverse})=> (reverse ? 'row-reverse' : 'row')};
`;

export const Card=styled.div`
    overflow: hidden;
    background: white;
    border-radius: 4px;
    box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
    margin: 10px;
    padding: 7px 10px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    border-radius: 4px 4px 0px 0px;
`;

export const FlexView=styled.div`
    display: flex;
    flex-direction: ${({reverse})=> (reverse ? 'column' : 'row')};
    ${({alignItems})=> alignItems && css `
        align-items: ${alignItems};
    `};
    ${({justify})=> justify && css `
        justify-content: ${justify};
    `};
`;