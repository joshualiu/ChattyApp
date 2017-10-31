import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");    
    return (
      <main className="messages">
        <Message />
        <div className="message system">
        </div>
      </main>
      // <div className="message">
      //   <span className="message-username">Anonymous</span>
      //   <span className="message-content">I won't be impressed with technology until I can download food.</span>
      // </div>
    );
  }
}
export default MessageList;
