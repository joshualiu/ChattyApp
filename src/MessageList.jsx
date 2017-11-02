import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    console.log("Rendering <MessageList/>"); 
    return (
      <main className="messages">
          { this.props.messages.map((item) => {
            if (item.type == "incomingMessage") {
              return (<Message 
                key={ item.id.toString() }
                username={ item.username }
                content={ item.content }/>) 
            } else if (item.type == "incomingNotification") {
              return (
                <div className="message system">
                  { item.content }
                </div>)
            } else {<div>something wrong!</div>}
          })
        }
      </main> 
    )
  }
}

export default MessageList;
