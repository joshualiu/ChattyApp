import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: '',
      currentUser: {name: "Anonymous"},
      messages: [], // messages coming from the server will be stored here as they arrive
    };
  }

  
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p id="online_users"><b>{ this.state.online }</b></p>
        </nav>
        <MessageList messages={ this.state.messages }/>
        <ChatBar currentUser={ this.state.currentUser } 
        onMessageSaved={ this.onMessageSaved }
        onNameSaved={ this.onNameSaved }/>
      </div>
    );
  }

  onNameSaved = (newname) => {
    console.log("on name saved", newname);
    this.socket.send(JSON.stringify({type: "postNotification", newname: newname, content: `${this.state.currentUser.name} has changed their name to ${newname}`}));
  }

  onMessageSaved = (newmsg, newname) => {
    console.log("message saved", newname);
    if(newname) {
      this.socket.send(JSON.stringify({type: "postMessage", username: newname, content: newmsg}));
    } else {
      this.socket.send(JSON.stringify({type: "postMessage", username: "Anonymous", content: newmsg}));
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne"); 
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    }

    this.socket.onmessage = (e) => {
      console.log("On Message", e.data);
      const data = JSON.parse(e.data);

      switch(data.type) {
        case "incomingMessage":
          console.log("incoming message");
          this.setState({messages: this.state.messages.concat(data)}); 
          // handle incoming message
          break;
        case "incomingNotification":
          console.log("incoming notification");
          this.setState({currentUser: {name: data.newname}});
          this.setState({messages: this.state.messages.concat(data)})
          // handle incoming notification
          break;
        case "online":
          this.setState({online: data.content});
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  }
}
export default App;


    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 100);