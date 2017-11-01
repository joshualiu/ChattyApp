import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");   
    // const messages = this.props.messages;
    const eachMessage = this.props.messages.map((item) => {
      return (<Message 
        key={ item.id.toString() }
        username={ item.username }
        content={ item.content }/>)
    });
    


    return (
      <main className="messages">
        { eachMessage }
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
