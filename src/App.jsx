import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }

  
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={ this.state.messages }/>
        <ChatBar currentUser={ this.state.currentUser } 
        onMessageSaved={ this.onMessageSaved }/>
      </div>
    );
  }

  // updateMessageList = (msg) => {
  //   console.log("updating msg list", msg)
  //   const newMessages = this.state.messages.push(msg);
  //     this.setState({messages: newMessages}); 
  //   }


  onMessageSaved = (msg) => {
    console.log("message saved", msg);
    console.log(this.state.messages);

    this.socket.send(JSON.stringify(msg));
    this.socket.onmessage = (event) => {
      let newData = JSON.parse(event.data);
      console.log('receive data', newData);
      this.setState({messages: this.state.messages.concat(newData)}); 
    }

  }




  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne"); 
    this.socket.onopen = function(event) {
      console.log("Connected to server");
    }


    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 100);
  }

}
export default App;

