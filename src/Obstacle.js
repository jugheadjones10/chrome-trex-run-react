import React, { Component } from "react"
import doubleCacti from "./images/double-cacti.png"
import singleCactus from "./images/single-cactus.png"
import rowCacti from "./images/row-cacti.png"
import raptorUp from "./images/raptor-up.png"
import raptorDown from "./images/raptor-down.png"
import "./jumpAnim.css"

class Obstacle extends Component {
    constructor(props){
        super(props)
        this.state = { 
            obsTicker : 0,
            gameState : null,
            myCacti : [
                {
                    obs : rowCacti,
                    top : 214
                },
                {
                    obs : singleCactus,
                    top : 201
                },
                {
                    obs : doubleCacti,
                    top : 201
                },
                {
                    obs : raptorUp,
                    top : Math.round(Math.random()*90 + 100)
                }
            ]
        }
        this.state = {
            ...this.state,
            meObj : this.state.myCacti[Math.round(Math.random()*3.5)]
        }
        
    }

    componentDidMount(){
        this.myObstacle = document.getElementById(this.props.myId)
        this.myDino = document.getElementById("dinoImg")

        this.interval = setInterval(() => this.tick(), 10)
    }
    
    tick(){
       
        if(this.state.obsTicker % 100 == 0){
            this.setState(function(prevState){
                if(prevState.meObj.obs == raptorUp || prevState.meObj.obs == raptorDown){
                    return{
                        meObj : prevState.meObj.obs == raptorUp?{obs : raptorDown, top : prevState.meObj.top}:{obs : raptorUp, top : prevState.meObj.top}
                    }
                }
            })
        }
        
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
            this.props.destroyOb()
        }
    } 

    render(){
        return(
            <div>
                <img 
                    id={this.props.myId}
                    src={this.state.meObj.obs}
                    style={{right: this.state.obsTicker, top: this.state.meObj.top}} 
                    className="MovingObs" 
                    alt="Bkla">
                </img>
            </div>
        )
    }
}

export default Obstacle