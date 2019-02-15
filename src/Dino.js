import React, { Component } from 'react'
import dinosaurBoth from './images/dinosaur.png'
import dinosaurLeft from './images/dinosaur_left.png'
import dinosaurRight from './images/dinosaur_right.png'
import dinosaurDie from './images/dinosaur_die.png'
import "./jumpAnim.css"

class Dino extends Component {
    constructor(props){
        super(props)
        this.state = {
            display : dinosaurBoth,
            runSpeed : 10,
            beforeRunStart: true
        }
        this.tick = this.tick.bind(this)
    }

    componentDidMount(){
    }

    tick(){
        this.setState(function(prevState){
            var newDis
            if(!this.props.isGrounded){newDis=dinosaurBoth}else if(prevState.display === dinosaurLeft){newDis=dinosaurRight}else(newDis=dinosaurLeft)
            return{
                display : newDis
            }
        })

        if(this.props.gameState == "gameOver"){
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
        if(this.props.gameState == "inGame" && this.state.beforeRunStart){
            this.interval = setInterval(() => this.tick(), 1000/this.state.runSpeed)
            this.setState({
                beforeRunStart: false,
                display: dinosaurBoth
            })
        }

        return(
            <div>
                <img id="dinoImg" className={this.props.isGrounded? "nothing" : "Dino"} style={{marginTop: 208, marginLeft: 60}} src={this.state.display} alt="Bla"></img>
            </div>
        )
    }
}

export default Dino
