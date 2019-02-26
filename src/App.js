import React, { Component } from 'react'
import Dino from './Dino'
import Ground from "./Ground"
import GameOverSign from "./GameOverSign"
import ScoreKeep from "./ScoreKeep"
import Obstacle from "./Obstacle"
import './App.css'

class App extends Component {
  constructor(){
    super()
    this.state = {
      gameState : "beforeBegin",
      appRightGround : 0,
      isGrounded: true,
      groundSpeed : 100,
      scoreCounter : 0,
      obstacleTicker : 0,
      obsInterval : 150,
      myObstaclesPlz : [],
      isCrouching : false
    }
    this.setDinoUp = this.setDinoUp.bind(this)
    this.spaceBarPress = this.spaceBarPress.bind(this)
    this.checkGameOver = this.checkGameOver.bind(this)
    this.tick = this.tick.bind(this)
    this.groundDino = this.groundDino.bind(this)
    this.restartOnPlayAgainPressed = this.restartOnPlayAgainPressed.bind(this)
  }

  spaceBarPress(e){
    if(e.keyCode === 38){
      this.setState(function(prevState){
        if(prevState.gameState === "beforeBegin"){
          this.interval = setInterval(() => this.tick(), 1000/this.state.groundSpeed)
          return{
            gameState : "inGame"
          }
        }
        else if(prevState.gameState === "inGame"){
          return{
            isGrounded: false
          }
        }
      })
    }
    else if(e.keyCode === 40){
      this.setState({
        isCrouching : true
      })
    }
  }

  tick(){
    this.setState(function(prevState){
      return{
          appRightGround : prevState.appRightGround + 5,
          scoreCounter : prevState.scoreCounter + 1,
          obstacleTicker : prevState.obstacleTicker + 1,
      }
    })

    if(this.state.appRightGround >= 1360){
      this.setState({
        appRightGround : 0
      })
    }

    if(this.state.obstacleTicker === this.state.obsInterval){
      this.setState(function(prevState){
          var addition = [
              <Obstacle 
                  checkGameOver={this.checkGameOver}    
                  myId={this.state.obstacleTicker}
              />
          ]
          return{
            myObstaclesPlz: addition.concat(prevState.myObstaclesPlz),
            obstacleTicker : 0,
            obsInterval : Math.round((Math.random() * 110 + 40))
          }
      })
    }    
  }


  checkGameOver(dinoRect, obstacleRect){
    if(
      dinoRect.right > obstacleRect.left + 10 &&
      dinoRect.left < obstacleRect.right -10 &&
      dinoRect.bottom > obstacleRect.top + 5 &&
      dinoRect.top < obstacleRect.bottom 
    ){
      clearInterval(this.interval)
      if(!this.state.isGrounded){
        document.getElementById("dinoImg").style.animationPlayState = "paused"
      }
      
      this.setState({
        gameState: "gameOver",
        obstacleTicker: 0,
        obsInterval : 150
      })
    }

    if(this.state.gameState === "gameOver"){
      return "gameOver"
    }else{
      return "inGame"
    }
  }

  restartOnPlayAgainPressed(){
    this.setState({
      gameState: "inGame",
      isGrounded: true,
      appRightGround : 0,
      scoreCounter : 0,
      myObstaclesPlz : []
    })
    document.getElementById("dinoImg").style.animationPlayState = "unset"
    this.interval = setInterval(() => this.tick(), 1000/this.state.groundSpeed)
  }

  setDinoUp(e){
    if(e.keyCode === 40){
      this.setState({
        isCrouching : false
      })
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.spaceBarPress, false)
    document.addEventListener("keyup", this.setDinoUp, false)
    document.getElementById("dinoImg").addEventListener("animationend", this.groundDino, false)
  }

  groundDino(){
    this.setState({
      isGrounded: true
    })
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.spaceBarPress, false);
    clearInterval(this.interval)
  }

  render(){

    return(
      <div>
        <Dino isCrouching={this.state.isCrouching} isGrounded={this.state.isGrounded} gameState={this.state.gameState}/>
        <GameOverSign gameState={this.state.gameState} changeHandler={this.restartOnPlayAgainPressed}/>
        <ScoreKeep scoreCounter={this.state.scoreCounter}/>
        <Ground rightGround={this.state.appRightGround} myObstaclesPlz={this.state.myObstaclesPlz}/>  
      </div>
    )
  }
}

export default App;
