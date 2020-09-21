import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import nameList from './sei25'
import NameButton from './NameButton';
import GroupArea from './GroupArea';

function App() {
    // console.log(nameList)
    let numStudents = nameList.length;
    let nameDisplay = (
        nameList.map(n => (
            <NameButton name={n} />
        ))
    )

    let groupsOfButtonDisplay = (
        [...Array(4).keys()].map(i => (
            <Button size="sm" className="mr-1" onClick={() => setGroupsOf(i + 2)}>{i + 2}</Button>
        ))
    )

    const [numGroups, setNumGroups] = useState(0);
    const [groupsOf, setGroupsOf] = useState(2);

    let groupDisplay = (
        [...Array(numGroups).keys()].map(g => (
            <GroupArea groupNo={g + 1} />
        ))
    )

    //Given groupsofn, generate num groups
    let getNumGroups = (n) => {
        let numGroups = Math.floor(numStudents / n);
        console.log(numGroups)
        return numGroups
    }

    useEffect(() => {
        setNumGroups(getNumGroups(groupsOf))
    }
        , [groupsOf])

    return (
        <Container>
            <Row className="mt-4">
                <Col md={4} className="border border-success">
                    <Row>
                        <Col>
                            <h4>Students ({numStudents})</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {nameDisplay}
                        </Col>
                    </Row>
                </Col>
                <Col md={8} className="border border-warning">
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <h4>Groups of {groupsOf}.</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {groupsOfButtonDisplay}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h4>
                                        Number of Groups: {numGroups}
                                    </h4>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        {/* <Col> */}
                        {groupDisplay}
                        {/* </Col> */}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default App;
