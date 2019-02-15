import React, { Component } from "react"
import "./jumpAnim.css"

import zero from "./images/numbers/0.png"
import one from "./images/numbers/1.png"
import two from "./images/numbers/2.png"
import three from "./images/numbers/3.png"
import four from "./images/numbers/4.png"
import five from "./images/numbers/5.png"
import six from "./images/numbers/6.png"
import seven from "./images/numbers/7.png"
import eight from "./images/numbers/8.png"
import nine from "./images/numbers/9.png"


function ScoreKeep(props){

    var numberConnector = [
        zero, one, two, three, four, five, six, seven, eight, nine
    ]
    var comeIn = Math.round(props.scoreCounter/10).toString().split("")

    while(comeIn.length < 5){
        comeIn.splice(0, 0, 0)
    }
    
    var displayScore = comeIn.map(function(each){
        return <li><img src={numberConnector[each]}></img></li> 
    })

    return(
        <div>
            <ul id="scoreKeep">
                {displayScore}
            </ul>
        </div>
    )
}


export default ScoreKeep