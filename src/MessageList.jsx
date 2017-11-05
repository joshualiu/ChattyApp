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
                type={ item.type }
                key={ item.id.toString() }      // set a key for each child
                username={ item.username }
                content={ item.content }
                color = { item.color }/>)       // the color for each incoming message
            } else if (item.type == "incomingNotification") {
              return (
                <Message
                  type={ item.type }
                  key={ item.id.toString() }
                  content={ item.content }/>
              )
              // return (
                
              //   <div className="message system">
              //     { item.content }
              //   </div>)
            } 
            else {
              return (<div>Invalid Message</div>)
            }
          })
        }
      </main> 
    )
  }
}

export default MessageList;
