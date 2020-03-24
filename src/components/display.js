import React, { Component } from 'react'

import styled from 'styled-components'

export default class DisplayCard extends Component {
    render() {
        return (
            <Container x={this.props.x} y={this.props.y}>
                <Name>{this.props.name}</Name>
                <Money><span role='img' aria-label="money">💰</span> {this.props.money}</Money>
                <Row>
                    {this.props.buttons.map((b, idx) => (
                        <Button key={idx} onClick={b.clickHandler}>
                            {b.text}
                        </Button>
                    ))}
                </Row>
            </Container>
        )
    }
}


const Container = styled.div`

    background: #fff2eccc;

    padding: 0.4vw 1vw;

    border: ${.6 / 2}vw solid #E5829B;

    borderRadius: border-radius: 0.8vw;,
    centerChild: display: flex;
                  justify-content: center;
                  align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;

    transform:
        translate(-50%, -50%)
        translateZ(10vw)
        translateX(${props => props.x}vh)
        translateY(${props => props.y}vh)
        rotateX(-50deg)
    ;

    transform-style: preserve-3d;


    display: flex;
    flex-direction: column;
    align-items: center;

`

const Name = styled.h4`

    margin: 0;

    font-family: "Open Sans";
    color: #4F314F;

`

const Money = styled.h6`

    margin: 0;

    font-family: "Open Sans";
    color: #4F314F;

`

const Row = styled.div`

    display: flex;
    align-items: center;

    margin: 0.4vw 0 0.2vw 0;

`

const Button = styled.button`

    background: #fff2eccc;
    color: #4F314F;

    font-family: "Open Sans";
    font-size: 0.8vw;

    width: 4vw;
    height: 100%;

    margin: 0 0.3vw;
    padding: 0.2vw 0.4vw;

    border: 0.15vw solid #E5829B;

    border-radius: 1vw;

    cursor: pointer;

    transform: translateZ(0.1vw);

    transition: transform 0.1s ease;

    transition-style: preserve-3d;

    &:active {
        transform: translateZ(0.05vw);
    }

    &:hover {
        box-shadow: inset 0 0 0 0.05vw #E5829B;
        font-weight: 700;
    }

    &:focus {
        outline: 1px solid #11111100;
    }


`