import React, { Component } from 'react'
import styled from 'styled-components'

class CardDisplay extends Component {
    render() {
        const {x, y, user, cards} = this.props
        return <MovableCard x={x} y={y}>
            {cards.map(card => {
                const image = !user ? `${process.env.PUBLIC_URL}/card-back.png` : `${process.env.PUBLIC_URL}/${card.name}.png`
                return <img key={card.id} className="coup-card" src={image} alt={card.name} />
            })}
        </MovableCard>
    }
}

export default CardDisplay;

const MovableCard = styled.div`
    position: absolute;
    top: 38%;
    left: 50%;

    transform:
        translate(-50%, -50%)
        translate(${props => props.x}vh,${props => props.y}vh)
    ;
`