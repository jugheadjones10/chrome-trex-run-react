import React from "react"
import "./jumpAnim.css"

import G from "./images/letters/G.png"
import A from "./images/letters/A.png"
import M from "./images/letters/M.png"
import E from "./images/letters/E.png"
import O from "./images/letters/O.png"
import V from "./images/letters/V.png"
import R from "./images/letters/R.png"

import playAgain from "./images/play-again.png"

function GameOverSign(props){
    return(
        <div>
            <ul style={{visibility: props.gameState === "gameOver"?"visible":"hidden"}} 
                id="gameOverSign">
                <li><img src={G} alt="G"></img></li>
                <li><img src={A} alt="A"></img></li>
                <li><img src={M} alt="M"></img></li>
                <li id="theSpecialE"><img src={E} alt="E"></img> </li>
                <li><img src={O} alt="o"></img></li>
                <li><img src={V} alt="V"></img></li>
                <li><img src={E} alt="E"></img></li>
                <li><img src={R} alt="R"></img></li>
                <img alt="again" style={{marginTop : 33}} src={playAgain} onClick={props.changeHandler}></img>
            </ul>
            <div>
                
            </div>  
        </div>
    )
}


export default GameOverSign