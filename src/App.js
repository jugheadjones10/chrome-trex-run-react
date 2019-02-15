import React, { Component } from 'react'
import Dino from './Dino'
import Ground from "./Ground"
import GameOverSign from "./GameOverSign"
import ScoreKeep from "./ScoreKeep"
import logo from './logo.svg'
import './App.css'



// class App extends Component {
//   constructor(){
//     super()
//     this.state = {
//       playerOneNo : 0,
//       playerTwoNo : 0,
//       oneVisibility : "visible",
//       twoVisibility :  "visible",
//       winner : null
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleClicker = this.handleClicker.bind(this)
//     this.comparerBut = this.comparerBut.bind(this)
//   }

//   handleChange(event){
//     var name = event.target.name
//     this.setState({
//       [name] : event.target.value
//     })
//   }

//   handleClicker(event){
//     var name = event.target.name
//     this.setState({
//       [name] : "hidden"
//     })
//   }
  
//   comparerBut(){
//     if(this.state.playerOneNo > this.state.playerTwoNo){
//       this.setState({
//         winner : "Player One won"
//       })
//     }else if(this.state.playerTwoNo > this.state.playerOneNo){
//       this.setState({
//         winner : "Player Two won"
//       })
//     }else{
//       this.setState({
//         winner : "Tie bitcheS!!!"
//       })
//     }
//     this.setState({
//       oneVisibility : "visible",
//       twoVisibility :  "visible",
//       playerOneNo : 0,
//       playerTwoNo : 0,
//     })
//   }

//   render() {
//     return (
//       <div className="App">
//         <input style={{visibility : this.state.oneVisibility}} name="playerOneNo" value={this.state.playerOneNo} onChange={this.handleChange}></input>

//         <button name="oneVisibility" onClick={this.handleClicker}>Hide Player One</button>
//         <input style={{visibility : this.state.twoVisibility}} name="playerTwoNo" value={this.state.playerTwoNo} onChange={this.handleChange}></input>

//         <button name="twoVisibility" onClick={this.handleClicker}>Hide Player Two</button>
//         <br/>
//         <button onClick={this.comparerBut}>Find Winner!</button>
//         <h1>{this.state.winner}</h1>
//         {/* <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header> */}
//       </div>
//     )
//   }  
// }

class App extends Component {
  constructor(){
    super()
    this.state = {
      gameState : "beforeBegin",
      isGrounded: true,
      appRightGround : 0,
      beforeRunStart : true,
      groundSpeed : 100,
      scoreCounter : 0
    }
    this.spaceBarPress = this.spaceBarPress.bind(this)
    this.groundDino = this.groundDino.bind(this)
    this.checkGameOver = this.checkGameOver.bind(this)
    this.tick = this.tick.bind(this)
    this.restartOnPlayAgainPressed = this.restartOnPlayAgainPressed.bind(this)
  }

  spaceBarPress(e){
    if(e.keyCode === 32){
      this.setState(function(prevState){
        if(prevState.gameState == "beforeBegin"){
          this.interval = setInterval(() => this.tick(), 1000/this.state.groundSpeed)
          return{
            gameState : "inGame"
          }
        }
        else if(prevState.gameState == "inGame"){
          return{
            isGrounded: false
          }
        }

      })
    }

  }

  tick(){
    this.setState(function(prevState){
      return{
          appRightGround : prevState.appRightGround + 5,
          scoreCounter : prevState.scoreCounter + 1
      }
    })

    

    if(this.state.gameState == "gameOver"){
      clearInterval(this.interval)
    }

    if(this.state.appRightGround >= 1360){
      this.setState({
        appRightGround : 0
      })
    }
  }


  checkGameOver(dinoRect, obstacleRect){
    if(
      dinoRect.right > obstacleRect.left &&
      dinoRect.left < obstacleRect.right -5 &&
      dinoRect.bottom > obstacleRect.top 
    ){
      this.setState({
        gameState: "gameOver"
      })
      if(!this.state.isGrounded){
        document.getElementById("dinoImg").style.animationPlayState = "paused"
      }
    }

    if(this.state.gameState == "gameOver"){
      return "gameOver"
    }else{
      return "inGame"
    }
  }

  restartOnPlayAgainPressed(){
    this.setState({
      gameState: "inGame",
      isGrounded: true,
      beforeRunStart : true,
      appRightGround : 0,
      scoreCounter : 0
    })
    document.getElementById("dinoImg").style.animationPlayState = "unset"
    this.interval = setInterval(() => this.tick(), 1000/this.state.groundSpeed)
  }

  groundDino(){
    this.setState({
      isGrounded: true
    })
  }

  componentDidMount(){
    document.addEventListener("keydown", this.spaceBarPress, false)
    document.getElementById("dinoImg").addEventListener("animationend", this.groundDino, false)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.spaceBarPress, false);
  }

  render(){

    return(
      <div>
        <Dino isGrounded={this.state.isGrounded} gameState={this.state.gameState}/>
        <GameOverSign gameState={this.state.gameState} changeHandler={this.restartOnPlayAgainPressed}/>
        <ScoreKeep scoreCounter={this.state.scoreCounter}/>
        <Ground rightGround={this.state.appRightGround} checkGameOver={this.checkGameOver} gameState={this.state.gameState}/>
      </div>
    )
  }
}

export default App;
