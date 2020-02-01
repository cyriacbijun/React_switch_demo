import React, { Component } from 'react';
import * as firebase from 'firebase';
import Switch from "react-switch";
import {
    Card, CardBody,
    CardSubtitle,UncontrolledAlert
} from 'reactstrap';
import { Parallax } from "react-parallax";;

var firebaseConfig = "PUT_firebase_linked_config_HERE"

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
class App extends Component {
    componentDidMount() {
        let usageref = firebase.database().ref().child('use');
        usageref.on('value', snapshot => {
            const usage_here = snapshot.val();
            this.setState({checked : usage_here});
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            this.writeData();
        }
    }

    constructor(props) {
        super(props);
        this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
        this.writeData = this.writeData.bind(this);
    }
    writeData(){
        var checked = this.state.checked;
        firebase.database().ref().child('use').set(checked);
    }
    handleChange(checked) {
        this.setState({ checked });
    }
    render() {
        var onAlert = this.state.checked && <UncontrolledAlert color="danger">
            Currently logged in
        </UncontrolledAlert>;
        var offAlert = !this.state.checked && <UncontrolledAlert color="success">
            Currently logged out
        </UncontrolledAlert>;
        return (
            <div>
                <Parallax bgImage="road.jpg" blur={{ min: -15, max: 15 }} strength={200}>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        {onAlert}
                        {offAlert}
                    </div>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh',}}>
                        <img  height="143px" src="future.jpg" alt="Your future" />
                        <Card>
                            <CardBody>
                                <h3>Gate Usage</h3>
                                <CardSubtitle>Click on the switch to indicate your usage</CardSubtitle>
                                <label>
                                    <Switch onChange={this.handleChange} checked={this.state.checked} />
                                </label>
                            </CardBody>
                        </Card>
                    </div>
                </Parallax>

            </div>

        );
    }
}

export default App;

