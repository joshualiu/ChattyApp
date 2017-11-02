import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");   
    const eachMessage = this.props.messages.messages.map((item) => {
      return (<Message 
        key={ item.id.toString() }
        username={ item.username }
        content={ item.content }/>)
    });
    
    return (
      <main className="messages">
        { eachMessage }
        <div className="message system">
            { this.props.messages.notification }
        </div>
      </main>
    );
  }
}
export default MessageList;
