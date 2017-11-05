import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    let style = {
      color: this.props.color
    };
    return (
      <div className="message">
        <span className="message-username" id={this.props.key } style={style}>{ this.props.username }</span>
        <span className="message-content">{ this.props.content }</span>
      </div>
    );
  }
}
export default Message;
