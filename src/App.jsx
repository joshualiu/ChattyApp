import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);    
    this.state = {
      currentUser: {name: "Josh"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
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

  onMessageSaved = (msg) => {
    console.log("message saved", msg);
    const newMessages = this.state.messages.concat(msg);
    this.setState({messages: newMessages}); 
    this.socket.send(JSON.stringify(msg));
    
  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    let socket = new WebSocket("ws://localhost:3001", "protocolOne"); 
    this.socket = socket    
    socket.onopen = function(event) {
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

