import React from 'react'
import { Col } from 'react-bootstrap'

export default function GroupArea(props) {
    return (
        <Col sm={4} className="border border-primary">
            {props.groupNo}
        </Col>
    )
}
