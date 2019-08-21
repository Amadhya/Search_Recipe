import React,{ PureComponent } from 'react';
import styled from 'styled-components';
import { Text, Row, Col, FlexView } from '../../components/recipe-ingredients/lib';

import Search from "./search";

const RowWrapper=styled(Row)`
    background: black;
    padding: 20px 100px;
    width: 100%;
    margin: 0px;
    @media(max-width: 767px){
        padding: 40px 20px;
    }
`;
const ColWrapper=styled(Col)`
    @media(min-width: 767px){
        margin: auto;
    }
`;
const ImageWrapper=styled(Col)`
    @media(max-width: 767px){
        display: none;
    }
`;
const Wrapper = styled(FlexView)`
    min-height: 100vh;
    width: 100%;
    background: #d8d8d8;
    @media(max-width: 767px){
        align-items: center;
    }
`;
const Image=styled.img`
    width:29%;
    padding: 5px;
`;
const Container = styled.div`
    margin: 0px 100px;
    position: relative;
    top: -25px;
    z-index: 2;
    @media(max-width: 767px){
        margin: 0px 10px;
    }
`;
class Ingredients extends PureComponent{
    render(){
        return(
          <Wrapper reverse>
              <RowWrapper>
                  <ColWrapper sm={6} xs={12}>
                      <Text color="white" size="30" weight="bold">
                          Recipe Search
                      </Text>
                      <br/>
                      <Text color="white" size="15">
                          A search engine to find recipes by their ingredients
                      </Text>
                  </ColWrapper>
                  <ImageWrapper sm={6} xs={0}>
                      <Image src="/static/img-3.png" alt="img1"/>
                      <Image src="/static/img-2.png" alt="img1"/>
                      <Image src="/static/img-1.png" alt="img1"/>
                  </ImageWrapper>
              </RowWrapper>
              <Container>
                <Search/>
              </Container>
          </Wrapper>
        );
    }
}

export default Ingredients;