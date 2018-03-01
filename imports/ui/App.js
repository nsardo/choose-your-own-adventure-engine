import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Stories } from '../api/stories.js';

import Story from './Story.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  renderStory() {
    return this.props.stor && this.props.stor.map((s) => {
      return (
        <Story
          id={s._id}
          key={s._id}
          text={s.text}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Story</h1>
          {
          }
        </header>
        <ul>
          {
          this.renderStory()
          }
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('storiesPub');

  return {
    stor: Stories.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
