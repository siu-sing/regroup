import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row, ButtonGroup, ToggleButton } from 'react-bootstrap';
import nameList from './sei25'
import NameButton from './NameButton';
import GroupArea from './GroupArea';

function App() {

    //Display Names
    const [numStudents, setNumStudents] = useState(nameList.length)
    let nameDisplay = (
        nameList.map((n, idx) => (
            <NameButton
                id={idx}
                name={n}
            />
        ))
    )
    const [radioValue, setRadioValue] = useState(0);
    //Display GroupsOf Button
    const groupsOfButtonDisplay = (

        [...Array(Math.floor(numStudents / 2) - 1).keys()].map(i => (
            <Button
                key={i}
                variant="dark"
                onClick={() => setGroupsOf(i + 2)}
                className="mr-1"
            >
                {i + 2}
            </Button>
        ))

    )

    const [numGroups, setNumGroups] = useState(0);
    const [groupsOf, setGroupsOf] = useState(2);

    //Display Group Area
    let groupDisplay = (
        [...Array(numGroups).keys()].map(g => (
            <GroupArea groupNo={g + 1} />
        ))
    )

    //Helper Function to get Number of Groups
    let getNumGroups = (n) => {
        let numGroups = Math.floor(numStudents / n);
        console.log(numGroups)
        return numGroups
    }

    //Update number of groups given change in set groupsof 
    useEffect(() => {
        setNumGroups(getNumGroups(groupsOf))
    }
        , [groupsOf])

    const [incList, setIncList] = useState([...nameList]);
    const [exList, setExList] = useState([]);

    //Drag and Drop functions
    const dropInclude = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        // card.style.display = 'block';
        e.target.appendChild(card)

        //Remove from exclude list if found, add to includelist
        let name = card.innerHTML;
        if (exList.includes(name)) {
            let tmpList = exList;
            tmpList.splice(tmpList.indexOf(name), 1);
            setExList(tmpList);
        }
        if (!incList.includes(name)){
            setIncList(incList.concat([name]))
        }
    }

    //Drag and Drop functions
    const dropExclude = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        // card.style.display = 'block';
        e.target.appendChild(card)

        //Remove From Include List if found Insert to Exclude List
        let name = card.innerHTML;
        if (incList.includes(card.innerHTML)) {
            let tmpList = incList;
            tmpList.splice(tmpList.indexOf(name), 1);
            setIncList(tmpList);
        }
        if (!exList.includes(name)){
            setExList(exList.concat([name]))
        }

    }

    const dragOver = e => {
        e.preventDefault();
    }

    //Button to reset page
    const refreshPage = () => {
        window.location.reload(false);
    }

    //Given number of groups, send student 


    return (
        <Container>
            <Row className="mt-4">
                <Col md={4} className="border border-success">
                    <Row>
                        <Col>
                            <h4>Students ({numStudents})</h4>
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={refreshPage}>Reset All</Button>
                        </Col>
                    </Row>
                    <Row>

                        <Col
                            className="border border-danger p-3"
                            onDrop={dropInclude}
                            onDragOver={dragOver}
                        >
                            Include ({incList.length})

                            {nameDisplay}
                        </Col>
                        <Col
                            className="border border-danger p-3"
                            onDrop={dropExclude}
                            onDragOver={dragOver}
                        >
                            Exclude ({exList.length})
                            
                        </Col>

                    </Row>
                </Col>
                <Col md={8} className="border border-warning">
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    Students per group: {groupsOf} <br />

                                    {groupsOfButtonDisplay}

                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>

                                    Number of Groups: {numGroups}

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
