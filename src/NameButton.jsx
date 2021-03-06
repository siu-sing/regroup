import React, { useState } from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'

export default function NameButton(props) {

    document.addEventListener('contextmenu', event => event.preventDefault());

    const dragStart = (e) => {
        const target = e.target;
        e.dataTransfer.setData('card_id', target.id)
        setTimeout(() => {
            // target.style.display="none";
        }, 0);
    }

    const dragOver = e => {
        e.stopPropagation();

    }


    return (
        <Row className="">
            <Col className="">
                <Card
                    className="p-1 mt-1 text-center name__tag"
                    // variant="success"
                    draggable="true"
                    onDragStart={dragStart}
                    onDragOver={dragOver}
                    id={props.id}
                    bg={props.color}
                    text="white"
                    onContextMenu={()=>(props.toggleColor(props.id))}
                >
                    {props.name}
                </Card>

            </Col>
        </Row>
    )
}
