import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");

    if (this.props.type == "incomingMessage") {
      let style = {
        color: this.props.color
      };
      return (
        <div className="message">
          <span className="message-username" style={style}>{ this.props.username }</span>
          <span className="message-content">{ this.props.content }</span>
        </div>
      )
    } else {
      return (
        <div className="message system">
          { this.props.content }
        </div>
      )
    }
  }
}
export default Message;
