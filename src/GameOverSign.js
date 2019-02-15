import React, { Component } from "react"
import "./jumpAnim.css"

import G from "./images/G.png"
import A from "./images/A.png"
import M from "./images/M.png"
import E from "./images/E.png"
import O from "./images/O.png"
import V from "./images/V.png"
import R from "./images/R.png"

import playAgain from "./images/play-again.png"

function GameOverSign(props){
    return(
        <div>
            <ul style={{visibility: props.gameState == "gameOver"?"visible":"hidden"}} 
                id="gameOverSign">
                <li><img src={G}></img></li>
                <li><img src={A}></img></li>
                <li><img src={M}></img></li>
                <li id="theSpecialE"><img src={E}></img> </li>
                <li><img src={O}></img></li>
                <li><img src={V}></img></li>
                <li><img src={E}></img></li>
                <li><img src={R}></img></li>
                <img style={{marginTop : 33}} src={playAgain} onClick={props.changeHandler}></img>
            </ul>
            <div>
                
            </div>  
        </div>
    )
}


export default GameOverSign