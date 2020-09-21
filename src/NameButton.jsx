import React from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'

export default function NameButton(props) {

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
        <Row>
            <Col className="">
                <Card
                    // className="border border-success mt-1"
                    variant="success"
                    draggable="true"
                    onDragStart={dragStart}
                    onDragOver={dragOver}
                    id={props.id}
                >
                    {props.name}
                </Card>

            </Col>
        </Row>
    )
}
