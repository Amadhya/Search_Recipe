import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';

import { Text, Row, Col, Card, FlexView } from '../../components/recipe-ingredients/lib';

const Wrapper=styled(FlexView)`
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.67);
    z-index: 2;
`;
const ContentWrapper  =styled.div`
    background: white;
    display: inline-flex;
    border-radius: 30px;
    padding: 5px 15px;
    width: 345px;
    border: 1px solid white;
    @media(max-width:767px) {
        width: 245px;
        padding: 8px;
    }
`;
const Box=styled(Row)`
    border-radius: 30px;
    border: 1px solid white;
    padding: 5px 25px;
    background: white;
    max-width: 600px;
     @media(max-width:767px) {
        padding: 5px;
        margin: 0px 10px;
    }
`;
const InputWrapper=styled.input`
    border: white;
    outline: none;
    line-height: 35px;
`;
const ButtonWrapper=styled.button`
    background: #545454;
    border: 1px solid #545454;
    color: white;
    border-radius: 25px;
    padding: 8px 18px;
    outline: none;
    @media(max-width:767px) {
        display: none;
    }
`;
const Image=styled.img`
    @media(min-width:767px){
        display: none;
    }
    background: #545454;
    padding: 5px;
    width: 90%;
    border-radius: 50%;
`;
const FoodImage = styled.img`
    width: 100%;
    height: 160px;
`;
const IngredientWrapper= styled.div`
    align-items: center;
    display: inline-flex;
    justify-content: center;
    background: gray;
    padding: 5px 5px 5px 10px;
    border-radius: 22px;
    margin: 4px 5px;
    color: white;
`;
const ImageWrapper=styled.img`
    width: 25px;
    margin-left: 10px;
`;
const ColWrapper = styled(Col)`
    display: flex;
    flex-flow: wrap;
    padding: 0px;
`;
const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    @media(max-width: 767px){
        margin-top: 20px;
    }
`;
const Container = styled.div`
    @media(max-width: 767px){
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
const Separator = styled.div`
    margin: 5px 0px;
`;
const AnchorWrapper = styled.div`
    padding: 10px;
    margin: 10px 10px;
    margin-top: 0px;
    border-radius: 0px 0px 4px 4px;
    box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
    color: #545454;
    a {
        text-decoration: none;
    }
`;

function fetchAPI(str){
    const baseUrl = `https://www.food2fork.com/api/search?key=3e9517b6a47692cf0bfe700f430e789c&q=${str}&page=2`;

    return fetch(baseUrl);
}

class Search extends PureComponent{
    constructor(props) {
        super(props);
        this.state={
            value: '',
            showModel: true,
            ingredients: [],
            json: {},
        };
    }

    handleChange= (e) => {
      this.setState({
         value: e.target.value,
      });
    };

    handleKeyPress = (e) => {
        if(['Enter','Tab','Space'].includes(e.key)){
            e.preventDefault();

            var ingredients=this.state.value.trim();

            if(ingredients){
                this.setState({
                    ingredients: [...this.state.ingredients, ingredients],
                    value: '',
                });
            }
        }
    };

    handleDelete = (val) => {
      this.setState({
          ingredients: this.state.ingredients.filter(ing => ing!==val),
      });
    };

    handleAdd = (val) => {
        if (val){
            this.setState({
                ingredients: [...this.state.ingredients, val],
            });
        }
    };

    onClickSearch(){
        const str=this.state.ingredients.toString();
        fetchAPI(str).then(res => res.json()).then(result => {
            this.setState({
                showModel: false,
                json: {
                    ...result,
                },
            });
        });
    }

    renderSearchBox = () => {
        const {ingredients} = this.state;

        return (
            <Fragment>
                <Col sm={9} xs={10}>
                    {ingredients.map(ing => (
                        <IngredientWrapper key={ing}>
                            <span>{ing}</span>
                            <ImageWrapper src="/static/cross.png" alt="delete" onClick={() => this.handleDelete(ing)}/>
                        </IngredientWrapper>
                    ))}
                    <InputWrapper
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyPress}
                    />
                </Col>
                <Col sm={3} xs={2} margin>
                    <ButtonWrapper onClick={() => this.onClickSearch()}>Search</ButtonWrapper>
                    <Image src="/static/search-icon.png" alt="search" onClick={() => this.onClickSearch()} />
                </Col>
            </Fragment>
        )
    };

    renderIngredients = () => {
        const { ingredients } = this.state;

        return (
            <div>
                {ingredients.map((item,index) => (
                    <IngredientWrapper key={index.toString()}>
                        {item.trim()}
                        <ImageWrapper src="/static/cross.png" alt="delete" onClick={() => this.handleDelete(item.trim())}/>
                    </IngredientWrapper>
                ))}
            </div>
        );
    };

    renderCards = () => {
        const { json: { recipes } } = this.state;

        return (
            <CardWrapper>
                {recipes.map( obj => (
                    <Col sm={3} xs={12} key={obj.href}>
                        <Card key={obj.title}>
                            <FoodImage src={obj.image_url} alt="food" />
                            <Separator/>
                            <Text weight="bold" size="16">
                                {obj.title}
                            </Text>
                            <hr/>
                            <Text color="gray" size="12">INGREDIENTS</Text>
                            <Separator/>
                            {this.renderIngredients()}
                            <br/>
                        </Card>
                        <AnchorWrapper>
                            <a href={obj.source_url}><Text color="#545454" size="15" align="center" weight="semibold">VIEW RECIPE --></Text></a>
                        </AnchorWrapper>
                    </Col>
                ))}
            </CardWrapper>
        );
    };

    render() {

        const { showModel } = this.state;

        return (
            <div>
                {showModel===true && (
                    <Wrapper reverse alignItems="center" justify="center">
                        <Box>
                            {this.renderSearchBox()}
                        </Box>
                        <br/>
                        <Text color="white" size="15">
                            Type in some ingredients you like
                        </Text>
                        <Text color="white" size="15">
                            and we will suggest you nice
                        </Text>
                        <Text color="white" size="15">
                            that you use in it
                        </Text>
                    </Wrapper>
                )}
                {showModel===false && (
                    <Container>
                        <ContentWrapper>
                            {this.renderSearchBox()}
                        </ContentWrapper>
                        {this.renderCards()}
                    </Container>
                )}
            </div>
        );
    }
}

export default Search;