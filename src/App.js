import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sound from 'react-sound';
import LineChart from 'react-linechart';
import mp3 from './airhorn.mp3'

import still from './media/frame00.gif';
import storm from './media/storm.gif';

//Bootstrap stuff
var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var ToggleButton = require('react-bootstrap/lib/ToggleButton');
var ToggleButtonGroup= require('react-bootstrap/lib/ToggleButtonGroup');
var Form = require('react-bootstrap/lib/Form');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var FormControl = require('react-bootstrap/lib/FormControl');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');


class App extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.func = this.func.bind(this);
        this.resetOpacity = this.resetOpacity.bind(this);
        this.updateCounter = this.updateCounter.bind(this);
        this.decrease_y_value = this.decrease_y_value.bind(this);
        this.stopSound = this.stopSound.bind(this);
        this.initiate_or_stop_sequence = this.initiate_or_stop_sequence.bind(this);

        this.state = {
            frequencyValue : 0,
            counter : 0,
            beerValue : 0,
            opacityValue : 0.3,
            interValId : "",
            counterInterval : "",
            run : true,
            buttonText : "Initiera Dryckessekvens",
            buttonClass : "success",
            showInformation : "none",
            play_sound : "STOPPED",
            graph_min : 0,
            current_y_value : 0,
            lower_y_interval : "",
            graph_max : 10,
            graph_data_points : [{color : "steelblue", points : [] } ],
            toggle_mythic : false,
            toggle_prediction : false
        }
    }

    componentWillMount() {
        document.body.style.backgroundImage = "url(" + still + ")"
    }

    handleChange(e) {
        if (e.target.value <= 400) {
            this.setState({frequencyValue : e.target.value})
        } else {
            console.log("too high")
        }
    }

    handleClick() {
        this.setState({opacityValue : 1})
    }

    resetOpacity() {
        this.setState({
            opacityValue : 0.3
        })
    }


    toggleMythic () {
    
    }

    togglePrediction () {
    
    }
    updateCounter() {
        var oldVal = this.state.counter;
        var bg = "./media/storm.gif"
        var newVal = oldVal + 1;
        this.setState({
            counter : newVal,
        })
    }

    stopSound() {
        this.setState({
            play_sound : "STOPPED"
        })
    }

    decrease_y_value() {
        var oldY = this.state.current_y_value;
        var newY = 0;
        if (oldY > 0) {
            newY = oldY - 1
        }
        this.setState({current_y_value : newY})
    }


    func() {
        //Trigger a drink
        var rnd = Math.floor(Math.random() * 1000)
        console.log(rnd)
        if (rnd < this.state.frequencyValue) {
            console.log("DRINK!!!!")
            var oldBeer = this.state.beerValue;
            var newBeer = oldBeer + 1;
            var oldPoints = this.state.graph_data_points[0].points;
            var oldY = this.state.current_y_value;
            var newY = oldY + 5
            var point = {x : this.state.counter, y: newY}
            var newPoints = oldPoints.push(point)
            oldPoints[0].points = newPoints
            this.setState({
                opacityValue : 1,
                beerValue : newBeer,
                graph_data_points : [{color : "steelblue", points : oldPoints}],
                play_sound : "PLAYING",
                current_y_value : newY
            })
            setTimeout(this.resetOpacity, 3000)
            setTimeout(this.stopSound, 1000)
        }
    }

    calc_flame_opacity(freqValue) {
        var normalizedFlame = freqValue / 400
        return normalizedFlame
    }

    initiate_or_stop_sequence () {
        if (this.state.run) {
            console.log("RUNNING")
            document.body.style.backgroundImage = "url(" + storm + ")"
            this.setState({
                buttonText : "Avsluta Dryckessekvens",
                buttonClass : "danger",
                interValId : setInterval(this.func, 3000),
                counterInterval : setInterval(this.updateCounter, 1000),
                lower_y_interval: setInterval(this.decrease_y_value, 5000),
                run : false,
                showInformation : "block"
            })
        } else {
            console.log("STOP")
            document.body.style.backgroundImage = "url(" + still + ")"
            this.setState({
                buttonText : "Initiera Dryckessekvens",
                buttonClass : "success",
                run : true,
                counter : 0,
                beerValue : 0,
                showInformation : "none"
            })
            clearInterval(this.state.interValId)
            clearInterval(this.state.counterInterval)
            clearInterval(this.state.lower_y_interval)
        }
    }

  render() {
    var imgDivStyle = {
        opacity : this.state.opacityValue,
    }

    var infoDivStyle = {
        color: "white"
    }

    var buttonStyle = {
        height : "10vh"
    }

    var formDivStyle={
        width : "10%",
        margin: "auto"
    }

    var frogImgStyle = {
        display : this.state.showInformation,
        position : "fixed",
        bottom: 0,
        zIndex: 2,
        left: 0
    }

    var flameImgStyle = {
        display : this.state.showInformation,
        position : "fixed",
        opacity : this.calc_flame_opacity(this.state.frequencyValue),
        bottom: "10%",
        left: "10%"
    }

    var radioDivStyle = {
        margin: "auto",
        width: "35%"
    }

   
    return (
      <div className="App">
        <div style={infoDivStyle}>
            <div>
            <h2>Osäker på när det är dags för vätskepaus?</h2> 
            <h2>Använd vår lösning som med hjälp av machine learning, AI, blockchain, och management beräknar när det är dags att återfukta.</h2>
            <h1>BEERCALC - Låt maskinerna göra jobbet</h1>
            </div>
            <div style={formDivStyle}>
            <form>
                <FormGroup>
                <ControlLabel>Vilken frekvens (0 - 400) önskas?</ControlLabel>
                <FormControl
                    type="number"
                    max="300"
                    value={this.state.frequencyValue}
                    placeholder="0"
                    onChange={this.handleChange}
                />
                </FormGroup>
            </form>
            </div>
            <Button onClick={this.initiate_or_stop_sequence} style={buttonStyle} bsStyle={this.state.buttonClass} >{this.state.buttonText}</Button>
        {/*
            <div style={radioDivStyle}>
            <h2>För avancerade användare</h2>
                <ButtonGroup name="advanced">
                    <Button onClick={this.initiate_or_stop_sequence} style={buttonStyle} bsStyle="primary" >Advanced Averaging Mode (TM)</Button>
                    <Button onClick={this.initiate_or_stop_sequence} style={buttonStyle} bsStyle="danger" >Mythic Difficulty</Button>
                    <Button onClick={this.initiate_or_stop_sequence} style={buttonStyle} bsStyle="success" >Normal Difficulty</Button>
                </ButtonGroup>
            </div>
        */}
        </div>
        <Row>
            <Col xs={4}> 
                <div style={{display: this.state.showInformation, marginTop : "-20%"}}>
                    <h2 style={{color : "white"}}>Beer-O-Meter</h2>
                    <h3 style={{color : "white"}}>{this.state.beerValue}</h3>
                </div>
                <img style={frogImgStyle} src={require('./media/frog.png')} />
                <img style={flameImgStyle} src={require('./media/flames.png')} />
            </Col>
            <Col xs={4} style={{opacity : this.state.opacityValue}}>
                <img id="prippan" style={{height: "50vh"}} src={require('./media/pripps.png')} />
            </Col>
            <Col xs={4}>
                <div style={{display : this.state.showInformation, marginLeft: "-10%", marginTop : "-20%", color: "white"}} xs={4}>
                    <h2>{this.state.counter}</h2>
                    <LineChart 
                        width={600}
                        height={400}
                        data={this.state.graph_data_points}
                        yMin = "0"
                    />
                    <h2>BEVITTNA VETENSKAPEN</h2>
                </div>
            </Col>
        </Row>
        <Sound
            url={mp3}
            playStatus = {this.state.play_sound}
        />
      </div>
    );
  }
}

export default App;
