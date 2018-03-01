
import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import { Meteor }           from 'meteor/meteor';
import { withTracker }      from 'meteor/react-meteor-data';

import { Stories }          from '../api/stories.js';

import { 
  Button,
  Form,
  FormGroup,
  FormControl,
  Radio,
} from 'react-bootstrap';

let first_time  = true;

// App component - represents the whole app
class StoryAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gid:          '',
      opt:          '',
      decisionR:    '',
      decisionWId:  '',
      stepR:        '',
      optionR:      '',
      variableR:    '',
      conditionR:   '',
      txt:          '',
      hideCompleted: false,
    };
  }

  insertStoryPart() {
    let text =  this.state.txt
      , type =  this.state.decisionR    ||
                this.state.decisionWId  ||
                this.state.stepR        || 
                this.state.optionR      || 
                this.state.variableR    || 
                this.state.conditionR;

    if ( text && type ) {
      if ( type != 'decision_with_id' && first_time ) {
          Bert.alert( 'You must start with a [Decision with Id]', 'danger' );
          this.clearUI(type);
          return;     
      }
      if ( type == 'decision_with_id' && first_time ) {
        first_time = false;
      }
      if ( type == 'decision_with_id' ) {
        this.setState({
          gid: ''
        });
      }
      if ( type == 'option') {
        this.setState({
          opt: ''
        });
      }
      Meteor.call(  'story.insert', 
                    type,
                    text,
                    this.state.gid,
                    this.state.opt,
                    (err, rslt)  => {
        if (err) {
          console.log( `err is ${err}` );
          this.clearUI( type );
        } else {
          try  {
            Bert.alert( 'Record successfully saved.', 'success' );

            if ( type == 'decision_with_id' ) {
              this.setState({
                gid: this.state.gid || rslt
              });
            }
            if ( type == 'option' ) {
              this.setState({
                opt: this.state.opt || rslt
              });
            }
            this.clearUI( type );
          } catch (e) {
            console.log( `e is ${e}`);
            this.clearUI( type );
          } 
        }
      });
    } else {
      Bert.alert('You must select both a type, and enter text before submitting!', 'danger');
      this.clearUI( type );
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  lookup( s ) {
    switch( s ) {
      case 'decision':         return 'decisionR';
      case 'decision_with_id': return 'decisionWId';
      case 'step':             return 'stepR';
      case 'option':           return 'optionR';
      case 'variable':         return 'variableR';
      case 'condition':        return 'conditionR';
      default: throw new Error( "Shouldn't have come to this" );
    }
  }
  clearUI( type ) {
    document.querySelector('#txt').value = "";
    document.querySelector('#decisionR').checked=false;
    document.querySelector('#decisionWId').checked=false;
    document.querySelector('#stepR').checked=false;
    document.querySelector('#optionR').checked=false;
    document.querySelector('#variableR').checked=false;
    document.querySelector('#conditionR').checked=false;
    this.setState({
      [this.lookup(type)]: ''
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Story Editor</h1>
            {
              <Form horizontal className="new-story">
              <FormGroup>
                  Decision with Id
                  <Radio  name="radioGroup" 
                          title="Decision with Id"
                          className="rad"
                          id="decisionWId" 
                          onChange={this.handleChange} 
                          value="decision_with_id" inline/>
                    
                  Decision
                  <Radio  name="radioGroup"
                          className="rad"
                          id="decisionR" 
                          onChange={this.handleChange} 
                          value="decision" inline/>
                    
                  Step
                  <Radio  name="radioGroup"
                          className="rad"
                          id="stepR" 
                          onChange={this.handleChange} 
                          value="step" inline/>
                    
                  Option
                  <Radio  name="radioGroup"
                          className="rad"
                          id="optionR" 
                          onChange={this.handleChange} 
                          value="option" inline/>
                    
                  Variable
                  <Radio  name="radioGroup"
                          className="rad"
                          id="variableR" 
                          onChange={this.handleChange} 
                          value="variable" inline/>
                          
                  Condition
                  <Radio  name="radioGroup"
                          className="rad"
                          id="conditionR" 
                          onChange={this.handleChange} 
                          value="condition" inline/>
              </FormGroup>
              <label>Text</label>
              <FormGroup>
                
                <FormControl  id="txt" 
                              onChange={this.handleChange} 
                              componentClass="textarea" 
                              placeholder="textarea" />
              </FormGroup>
              <Button bsStyle="success" 
                      bsSize="large"
                      onClick={this.insertStoryPart.bind(this)}
                      block>
                      Submit
              </Button>
              </Form>
            }
          </div>
        </div>
      </div>
      );
  }
}

export default withTracker(() => {
  //Meteor.subscribe('storiesPub');

  return {
    //stor: Stories.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(StoryAdmin);