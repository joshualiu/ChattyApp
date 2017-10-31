import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">Anonymous</span>
        <span className="message-content">I won't be impressed with technology until I can download food.</span>
      </div>
    );
  }
}
export default MessageList;
