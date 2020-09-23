import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row, ButtonGroup, ToggleButton } from 'react-bootstrap';
import nameList from './sei25'
import NameButton from './NameButton';
import GroupArea from './GroupArea';

function App() {


    //Generate students object from students names
    let students = {};
    nameList.forEach((n,i)=> {
        students[i]=n;
    });
    const [numStudents, setNumStudents] = useState(nameList.length)

    //Display Names
    let nameDisplay = (
        Object.keys(students).map((k) => (
            <NameButton
                key={k}
                id={k}
                name={students[k]}
            />
        ))
    )

    // Group settings
    const [numGroups, setNumGroups] = useState(0);
    const [groupsOf, setGroupsOf] = useState(2);

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

    //Helper Function to get Number of Groups
    let getNumGroups = (n) => {
        let numGroups = Math.floor(incList.length / n);
        return numGroups
    }

    
    //Array of student indexes included
    const [incList, setIncList] = useState(Object.keys(students));
    //Array of student indexes excluded
    const [exList, setExList] = useState([]);

    //Initialize group config - the list of indexes in each group
    let getInitGroupConfig = (numGroups) => {
        let initGroupConfig = {};
    
        [...Array(numGroups).keys()].forEach(g => {
            initGroupConfig[g] = []
        })

        // console.log(initGroupConfig);
        return  initGroupConfig;
    }
    let initGroupConfig = getInitGroupConfig(getNumGroups(groupsOf));
    
    const [groupConfig, setGroupConfig] = useState(initGroupConfig)

    //Display Group Area
    let groupDisplay = (
        [...Array(numGroups).keys()].map(g => (
            <GroupArea
                key={g+numGroups}
                groupNo={g + 1}
                groupConfig={groupConfig[g]}
                incList={incList}
                students={students}
            />
        ))
    )


    //Update number of groups given change in set groupsof 
    useEffect(() => {
        setNumGroups(getNumGroups(groupsOf));
        setGroupConfig(getInitGroupConfig(getNumGroups(groupsOf)));
        console.log("INCLIST")
        console.log(incList)
    }
        , [groupsOf,incList])


    //Dropping into the Include Area
    const dropInclude = (e) => {

        //Attach child when dropped into area
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        e.target.appendChild(card)

        //Update group config states

        //Remove from exclude list if found, add to includelist
        if (exList.includes(card_id)) {
            let tmpList = exList;
            tmpList.splice(tmpList.indexOf(card_id), 1);
            setExList(tmpList);
        }

        //Add name to include list if not already there
        if (!incList.includes(card_id)) {
            setIncList(incList.concat([card_id]))
        }
    }

    //Dropping into the Exclude Area
    const dropExclude = (e) => {

        //Attach child when dropped into area
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        e.target.appendChild(card)

        //Remove From Include List if found Insert to Exclude List
        if (incList.includes(card_id)) {
            let tmpList = incList;
            tmpList.splice(tmpList.indexOf(card_id), 1);
            setIncList(tmpList);
        }

        //Add name to exclude list if not already there
        if (!exList.includes(card_id)) {
            setExList(exList.concat([card_id]))
        }

    }

    //Drag and drop function
    const dragOver = e => {
        e.preventDefault();
    }

    //Button to reset page
    const refreshPage = () => {
        window.location.reload();
    }

    const [distributeClicked, setDistributeClicked] = useState(false);

    //Assign students
    const assignStudents = () => {

        //Copy current groupConfig
        let groupConfigTemp = {};
        //if distribute clicked, reset groupConfig first before redistributing, else just copy existing config
        groupConfigTemp = distributeClicked ? getInitGroupConfig(getNumGroups(groupsOf)) : {...groupConfig}

        //Random sort incList
        let studentArrIdx = [...incList];
        console.log("student array index")
        console.log(studentArrIdx)
        //Fisher-Yates Algo
        for(let i = studentArrIdx.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = studentArrIdx[i]
            studentArrIdx[i] = studentArrIdx[j]
            studentArrIdx[j] = temp
          }

        //Insert min number of students into each group
        Object.keys(groupConfigTemp).forEach(k => {
            while(groupConfigTemp[k].length<groupsOf){
                groupConfigTemp[k].push(studentArrIdx.pop())
            }
        })
        console.log(groupConfigTemp);
        //If there are leftovers, insert them round robin style
        let key = 0;
        while (studentArrIdx.length>0) {
            groupConfigTemp[key].push(studentArrIdx.pop())
            key= (key+1)%numGroups;
        }

        console.log(groupConfigTemp);
        //Update groupConfig with new groupings
        setGroupConfig(groupConfigTemp);
        
        //Set Distributed clicked to true
        setDistributeClicked(true);
    }


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
                                    <Button 
                                    variant="primary"
                                    onClick={assignStudents}
                                    >Distribute</Button>
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
