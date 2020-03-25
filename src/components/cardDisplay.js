import React, { Component } from 'react'
import styled from 'styled-components'

class CardDisplay extends Component {
    render() {
        const { user, cards } = this.props
        return <MovableCard>
            {cards && cards.map(card => {
                const image = !user ? `${process.env.PUBLIC_URL}/card-back.png` : `${process.env.PUBLIC_URL}/${card.name}.png`
                return <img key={card.id} className="coup-card" src={image} alt={card.name} />
            })}
        </MovableCard>
    }
}

export default CardDisplay;

const MovableCard = styled.div`
    display: flex;
`