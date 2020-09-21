import React from 'react'
import { Badge, Button, Col, Row } from 'react-bootstrap'

export default function NameButton(props) {
    return (
        <Row>
            <Col>

                <Badge variant="success" >
                    {props.name}
                </Badge>

            </Col>
        </Row>
    )
}
