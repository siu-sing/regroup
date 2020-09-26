import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import NameButton from './NameButton';

export default function GroupArea(props) {
    let gcc = {...props.globalGroupConfig};
    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        // card.style.display = 'block';
        // e.target.appendChild(card)


        //Update Global Group Config upon drop
        // 1 
        //      if distributeClicked - search and remove from old group
        //      else - remove from incList removeFromIncList(id)

        if (props.distributeClicked) {
            //for each key in globalgroupconfig
            //if id exists, splice
            Object.keys(gcc).forEach(g => {
                if (gcc[g].indexOf(card_id) >= 0) {
                    gcc[g].splice(gcc[g].indexOf(card_id), 1)
                }
            })
        } else {    //distribute not clicked yet
            props.removeFromIncList(card_id)
            props.setSeeded(true);
        }

        // 2 - add into this group
        gcc[props.groupNo - 1].push(card_id)
        props.setGlobalGroupConfig(gcc);
        console.log(props.globalGroupConfig)
    }

    const dragOver = e => {
        e.preventDefault();
    }

    let nameDisplay = (
        props.groupConfig.map(i => (
            <NameButton
                key={i}
                id={i}
                name={props.students[i]}
                color={props.colorConfig[i]}
                toggleColor={props.toggleColor}
            />
        ))
    )

    console.log("GROUPAREA")
    console.log(props.groupConfig)
    return (
        <Col
            onDrop={drop}
            onDragOver={dragOver}
            sm={4}
            className="border border-primary p-3">
            {props.groupNo}
            {props.children}
            {nameDisplay}
        </Col>
    )
}
