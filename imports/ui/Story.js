import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Stories } from '../api/stories.js';

// Task component - represents a single todo item
export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <li>
        <span className="text">
          <strong>{this.props.text}</strong>
        </span>
     </li>
    );
  }
}
