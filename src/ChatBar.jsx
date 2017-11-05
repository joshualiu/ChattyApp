import React, {Component} from 'react';
class ChatBar extends Component {


  submitMessage = (event) => {
    // check if the input message is empty or only white spaces.
    let checkEmptyMsg = event.target.value.replace(/[\s\r]/g, "").length

    // if user hits 'Enter' and the input is not empty, call onMessageSaved function
    if(event.key == 'Enter' && checkEmptyMsg != 0){
      this.props.onMessageSaved(event.target.value, this.name)
      event.target.value = null;            // clear the input form
    }
  }

  // when user makes any changes in the name form, update this.name
  nameChange = (e) => {
    this.name = e.target.value;
  }

  submitName = (event) => {
    if(event.key == 'Enter' && event.target.value != '') {
      this.props.onNameSaved(event.target.value);
      event.target.value = null;          // clear the input form
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");   
    return (
      <footer className="chatbar">
        <input className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          onChange={ this.nameChange }        
          onKeyPress={ this.submitName} />
        <input className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          onKeyPress={ this.submitMessage }/>
      </footer>
    );
  }
}

export default ChatBar;
