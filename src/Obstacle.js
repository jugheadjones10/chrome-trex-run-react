import React, { Component } from "react"
import doubleCacti from "./images/double-cacti.png"
import singleCactus from "./images/single-cactus.png"
import rowCacti from "./images/row-cacti.png"
import "./jumpAnim.css"

class Obstacle extends Component {
    constructor(props){
        super(props)
        this.state = { 
            obsTicker : 0,
            gameState : null,
            myCacti : [
                {
                    obs : doubleCacti,
                    top : 201
                },
                {
                    obs : singleCactus,
                    top : 201
                },
                {
                    obs :   rowCacti,
                    top : 214
                }
            ],
            whichObsAmI : Math.round(Math.random()*2)
        }

        
    }

    componentDidMount(){
        this.myObstacle = document.getElementById(this.props.myId)
        this.myDino = document.getElementById("dinoImg")

        this.interval = setInterval(() => this.tick(), 10)
    }
    
    tick(){
        this.dinoRect = this.myDino.getBoundingClientRect()
        this.obstacleRect = this.myObstacle.getBoundingClientRect()
        this.setState({
            gameState: this.props.checkGameOver(this.dinoRect, this.obstacleRect)
        })

        if(this.state.gameState == "gameOver"){
            clearInterval(this.interval)
        }

        this.setState(function(prevState){
            return{
                obsTicker : prevState.obsTicker + 5
            }
        })

        if(this.state.obsTicker >= 1360){
            clearInterval(this.interval)
        }
    } 

    render(){

        return(
            <div>
                <img 
                    id={this.props.myId}
                    src={this.state.myCacti[this.state.whichObsAmI].obs} 
                    style={{right: this.state.obsTicker, top: this.state.myCacti[this.state.whichObsAmI].top}} 
                    className="MovingObs" 
                    alt="Bkla">
                </img>
            </div>
        )
    }
}

export default Obstacle