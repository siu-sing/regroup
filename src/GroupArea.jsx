import React from 'react'
import { Col } from 'react-bootstrap'

export default function GroupArea(props) {

    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        // card.style.display = 'block';
        e.target.appendChild(card)
    }

    const dragOver = e => {
        e.preventDefault();
    }

    return (
        <Col
            onDrop={drop}
            onDragOver={dragOver}
            sm={4}
            className="border border-primary p-3">
                {props.groupNo}
                {props.children}
        </Col>
    )
}
