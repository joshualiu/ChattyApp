import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");    
    return (
      <div className="message">
        <span className="message-username">Anonymous</span>
        <span className="message-content">I won't be impressed with technology until I can download food.</span>
      </div>
    );
  }
}
export default MessageList;
