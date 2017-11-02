import React, {Component} from 'react';
class ChatBar extends Component {

  submitMessage = (event) => {
    let checkEmptyMsg = event.target.value.replace(/[\s\r]/g, "").length
    if(event.key == 'Enter' && checkEmptyMsg != 0){
      this.props.onMessageSaved(event.target.value, this.name)
      event.target.value= null;      
    }
  }

  nameChange = (e) => {
    this.name = e.target.value;
  }


  render() {
    console.log("Rendering <ChatBar/>");   
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={ this.props.currentUser.name } 
        onChange={ this.nameChange } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" 
        onKeyPress={ this.submitMessage }
        />
      </footer>
    );
  }
}


export default ChatBar;
