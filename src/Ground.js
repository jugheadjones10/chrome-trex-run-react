import React, { Component } from 'react'
import ground from './images/ground.png'
import "./jumpAnim.css"

function Ground(props){
    return(
        <div>
            <img 
            id="groundOne"
            className="MovingGround" 
            style={{right: props.rightGround}} 
            src={ground} 
            alt="Bla">
            </img>
            {props.myObstaclesPlz}
            <img 
            id="groundTwo"
            className="MovingGround" 
            style={{right: props.rightGround-1360}} 
            src={ground} 
            alt="Bla">
            </img>
        </div>
    )
}

export default Ground
