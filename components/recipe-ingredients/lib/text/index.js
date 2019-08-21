import styled from 'styled-components';

const WEIGHTS= {
    bolder: 800,
    bold: 700,
    semibold: 600,
    normal: 400,
    light: 300,
    lighter: 200,
    thin: 100,
};

export default styled.div`
  display: ${({ display }) => display || 'block'};
  font-family: 'Nunito', sans-serif !important;
  font-size: ${({ size}) => `${size}px`};
  font-weight: ${({ weight }) => WEIGHTS[weight] || WEIGHTS.normal};
  color: ${({ color}) => color || 'black'};
  text-align: ${({ align }) => align || 'left'};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  line-height: ${({height})=> (height ? `${height}px` : '20px')};
`;
