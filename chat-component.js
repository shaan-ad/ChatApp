var ChatApp = window.React.createClass({
   getInitialState: function() {
       return {
           messages: [],
           socket: window.io('http://localhost:3000'),
           user: undefined
       }
   },
    componentDidMount: function () {
       var self = this;
        this.state.socket.on("receive-message",function(msg){
            var messages = self.state.messages;
                messages.push(msg);
            self.setState({messages: messages});
            console.log(messages);
        });
    },
    submitMessage: function () {
      var body = document.getElementById("message").value;
      var user = document.getElementById("user").value;
      this.setState({user: user});
      var message = {
         body: body,
         user: user || "guest"
      };
      this.state.socket.emit("new-message",message);
    },

    render: function () {
       var self = this;
       var messages = self.state.messages.map(function(msg) {
            return <li> <strong>{msg.user}</strong> <span>{msg.body}</span> </li>
       });

       return (
           <div>
               <ul>
                   {messages}
               </ul>
               <div id="test">
               <input id="user" type="text" placeholder="Pick a Username"/>
                   <br/>
               <input id="message" type="text" placeholder="Write your message" size="100"/>
                   <br/>
               <button onClick={() => self.submitMessage()}> Send Message </button>
               </div>
           </div>
       )
   }
});

window.ReactDOM.render(
    <ChatApp/>,
    document.getElementById("chat")
);