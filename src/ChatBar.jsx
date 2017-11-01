import React, {Component} from 'react';
let i = 100;
class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      content: ''
    }
  }


  submitMessage = (event) => {
    
    if(event.key == 'Enter'){
      // event.preventDefault(); 
      i++;
      console.log('submit message enter press here!', event.target.value)
      event.target.value="";
      this.props.onMessageSaved ({
        id: i,
        username: "Josh",
        content: this.state.content
      })
    }
  }


  handleMessageChange = (event) => {
    console.log('handleMessageChange', event.target.value);
    this.setState({content: event.target.value});
  }


  render() {
    console.log("Rendering <ChatBar/>");   
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={ this.props.currentUser.name }  />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" 
        onChange={ this.handleMessageChange } 
        onKeyPress={ this.submitMessage }
        />
      </footer>
    );
  }
}


export default ChatBar;
