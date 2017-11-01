import React, {Component} from 'react';
class ChatBar extends Component {

  submitMessage = (event) => {
    
    if(event.key == 'Enter' && event.target.value != ''){
      // event.preventDefault(); 
      console.log('submit message enter press here!', event.target.value);
      this.props.onMessageSaved(event.target.value)
      event.target.value= null;      
    }
  }


  // handleMessageChange = (event) => {
  //   console.log('handleMessageChange', event.target.value);
  //   this.setState({content: event.target.value});
  // }


  render() {
    console.log("Rendering <ChatBar/>");   
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={ this.props.currentUser.name }  />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" 
        onKeyPress={ this.submitMessage }
        />
      </footer>
    );
  }
}


export default ChatBar;
