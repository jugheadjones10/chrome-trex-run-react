import React, { Component } from 'react'
import dinosaurBoth from './images/dinosaur.png'
import dinosaurLeft from './images/dinosaur_left.png'
import dinosaurRight from './images/dinosaur_right.png'
import dinosaurDie from './images/dinosaur_die.png'
import crouchLeft from './images/crouch-left.png'
import crouchRight from './images/crouch-right.png'
import "./jumpAnim.css"

class Dino extends Component {
    constructor(props){
        super(props)
        this.state = {
            display : dinosaurBoth,
            runSpeed : 10,
            beforeRunStart: true,
            dinoClass : "nothing",
            marginTime : {
                marginTop: 208, 
                marginLeft: 60   
            }
        }
        this.tick = this.tick.bind(this)
    }

    componentDidMount(){
       
    }

    tick(){
        this.setState(function(prevState){
            var newDis
            if(!this.props.isCrouching){
                if(this.props.isGrounded){
                    this.setState({
                        dinoClass : "nothing"
                    })
                }
                if(!this.props.isGrounded){
                    this.setState({
                        dinoClass : "Dino"
                    })
                    return{
                        display : dinosaurBoth
                    }
                }
                
                if(prevState.display === dinosaurLeft){newDis=dinosaurRight}
                else (newDis=dinosaurLeft)
                return{
                    display : newDis,
                    marginTime : {
                        marginTop: 208, 
                        marginLeft: 60   
                    }
                }
            }else{
                if(!this.props.isGrounded){
                    return{
                        dinoClass : "DinoCrouch",
                        // marginTime : {
                        //     marginTop: 220, 
                        //     marginLeft: 60  
                        // }
                    }
                    // document.getElementById("dinoImg").className = "DinoCrouch"
                }else{
                    // document.getElementById("dinoImg").className = "nothing"
                    if(prevState.display === crouchLeft){newDis=crouchRight}
                    else (newDis=crouchLeft)
                    return{
                        display : newDis,
                        dinoClass : "nothing",
                        marginTime :  {
                            marginTop: 220, 
                            marginLeft: 60  
                        }
                    }
                }
            }
        })

        if(this.props.gameState === "gameOver"){
            this.setState({
                display: dinosaurDie,
                beforeRunStart: true
            })
            clearInterval(this.interval)
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render(){
        if(this.props.gameState === "inGame" && this.state.beforeRunStart){
            this.interval = setInterval(() => this.tick(), 1000/this.state.runSpeed)
            this.setState({
                beforeRunStart: false
            })
        }


        return(
            <div>
                <img id="dinoImg" className={
                    this.state.dinoClass
                    // this.props.isGrounded? "nothing" :
                    //  "Dino"
                    } 
                    // style={this.state.marginTime[
                    //     this.state.display===(crouchLeft||crouchRight)?"dinoCrouching":"dinoUp"
                    // ]}
                    style={this.state.marginTime}
                    src={this.state.display} 
                    alt="Bla"></img>
            </div>
        )
    }
}

export default Dino