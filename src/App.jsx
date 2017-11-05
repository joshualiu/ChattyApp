import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      online: 0,                          // save the number of online users
      currentUserColor: 'Black',          // save the current user's font color, default is black
      currentUser: {name: "Anonymous"},   // save the current user's name, defalut is Anonymous
      messages: [],                       // messages coming from the server will be stored here as they arrive
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
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser } 
          onMessageSaved={ this.onMessageSaved }
          onNameSaved={ this.onNameSaved }/>
      </div>
    );
  }

  /**
   * function onNameSaved(newname): when the current user change their name, 
   *    change the current state and send the data back to the server, together with the type: "postNotification"
   */
  onNameSaved = (newname) => {
    this.setState({currentUser: {name: newname}});
    this.socket.send(JSON.stringify({type: "postNotification", newname: newname, content: `${this.state.currentUser.name} has changed their name to ${newname}`}));
  }

  /**
   * function onMessageSaved(newmsg, newname): when the current user send a new message,
   *    send it back to the server, together with the type: "postMessage", and the user's font color
   */
  onMessageSaved = (newmsg, newname) => {
    if(newname) {
      this.socket.send(JSON.stringify({type: "postMessage", username: newname, content: newmsg, color: this.state.currentUserColor}));
    } else {
      this.socket.send(JSON.stringify({type: "postMessage", username: "Anonymous", content: newmsg, color: this.state.currentUserColor}));
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne"); 
    this.socket.onopen = (e) => {
      console.log("Connected to server");
    }

    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      switch(data.type) {
        // handle incoming message
        case "incomingMessage":
          this.setState({messages: this.state.messages.concat(data)}); 
          break;
        
        // handle incoming notification
        case "incomingNotification":
          this.setState({messages: this.state.messages.concat(data)})
          break;
        
        // handle the online users count data
        case "online":
          this.setState({online: data.content});
          break;

        // handle a user's font color
        case "color":
          this.setState({currentUserColor: data.content});
          break;

        // show an error in the console if the message type is unknown
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  }
}
export default App;
