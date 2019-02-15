import React, { Component } from 'react'
import ground from './images/ground.png'
import Obstacle from "./Obstacle"
import "./jumpAnim.css"

class Ground extends Component {
    constructor(props){
        super(props)
        this.state = {
            obstacleTicker : 0,
            myObstaclesPlz : [],
            beforeRunStart : true,
            obsInterval : 150,
        }
        this.tick = this.tick.bind(this)
        
    }


    tick(){
        this.setState(function(prevState){
            return{
                obstacleTicker : prevState.obstacleTicker + 1,
            }
        })

        if(this.state.obstacleTicker == this.state.obsInterval){
            this.setState(function(prevState){
                var addition = [
                    <Obstacle 
                        checkGameOver={this.props.checkGameOver}    
                        myId={this.state.obstacleTicker}
                    />
                ]
                return{
                    myObstaclesPlz: addition.concat(prevState.myObstaclesPlz)
                }
            })

            this.setState({
                obstacleTicker : 0,
                obsInterval : Math.round((Math.random() * 110 + 40))
            })
        }    
        if(this.props.gameState == "gameOver"){
            clearInterval(this.interval)
            this.setState({
                beforeRunStart: true,
                obstacleTicker: 0,
                obsInterval : 150
            })
        }

        
    }

    render(){
        if(this.props.gameState == "inGame" && this.state.beforeRunStart){
            if(this.state.myObstaclesPlz.length > 0){
                this.setState({
                    myObstaclesPlz : []
                })
            }
            this.interval = setInterval(() => this.tick(), 10)
            this.setState({
                beforeRunStart: false
            })
        }

        return(
            <div>
                <img 
                id="groundOne"
                className="MovingGround" 
                style={{right: this.props.rightGround}} 
                src={ground} 
                alt="Bla">
                </img>
                {this.state.myObstaclesPlz}
                <img 
                id="groundTwo"
                className="MovingGround" 
                style={{right: this.props.rightGround-1360}} 
                src={ground} 
                alt="Bla">
                </img>
            </div>
        )
    }
}

export default Ground
