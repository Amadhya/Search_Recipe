import React from 'react';
import styled from 'styled-components';
import {Card, Col, Row} from "../../components/recipe-ingredients/lib/layout";
import {Text} from "../../components/recipe-ingredients/lib";

const DisplayIngredients = (obj) => {
    var object = obj.ingredients.split(",");
    const { showMore } = obj;
    const { ingredients } = this.state;

    if(!showMore && object.length>=3){
        object = object.slice(1,3);
    }
    return (
        <div>
            {object.map((item,index) => (
                <IngredientWrapper key={index.toString()}>
                    {item.trim()}
                    {ingredients.includes(item.trim()) ?
                        <ImageWrapper src="/static/cross.png" alt="delete" onClick={() => this.handleDelete(item.trim())}/>
                        :
                        <ImageWrapper src="/static/cross.png" alt="add" onClick={() => this.handleAdd(item.trim())}/>
                    }
                </IngredientWrapper>
            ))}
            {!showMore && (
                <IngredientWrapper onClick={() => this.onClickShowMore(obj)}>
                    Show More...
                </IngredientWrapper>
            )}
        </div>
    );
};
const Dishes = () => (
    <CardWrapper>
        {recipies.map( obj => (
            <Col sm={3} xs={12} key={obj.href}>
                <Card key={obj.title}>
                    <Row>
                        <Col sm={9} xs={8}>
                            <Text weight="bold">
                                {obj.title}
                            </Text>
                        </Col>
                        <Col sm={3} xs={4}>
                            <FoodImage src={obj.image_url} alt="food" />
                        </Col>
                    </Row>
                    <hr/>
                    <Text color="gray" size="12">INGREDIENTS</Text>
                    <Separator/>
                    {this.renderIngredients(obj)}
                    <br/>
                </Card>
                <AnchorWrapper>
                    <a href={obj.source_url}><Text color="#545454" size="15" align="center" weight="semibold">VIEW RECIPE --></Text></a>
                </AnchorWrapper>
            </Col>
        ))}
    </CardWrapper>
);

export default Dishes;