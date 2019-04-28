import React, { Component } from "react";

const DiscussionMessage = props => {
  console.log('DiscussionMessage');
  return <h2>{props.msg}</h2>;
};
//============================================================
class DiscussionList extends Component {
  constructor() {
    super();
    console.log('DiscussionList-1-constructor');
    const messages = ["One message", "Two message"];
    this.state = {
      messages: this.allMessages(messages)
    };
  }

  allMessages = messages =>
    messages.map(message => {
      return (
        <div>
          <DiscussionMessage
            key={`Message-${String(new Date())}`}
            msg={message}
          />
        </div>
      );
    });

  componentDidMount() {
    console.log("DiscussionList-3-componentDidMount");
    
    this.messageAdder = setInterval(() => {
      
      
      this.setState({
        messages: this.state.messages.concat([<div>Another one...</div>])
      });
    }, 2000);
    
  }

  componentWillUnmount() {
    console.log("DiscussionList-last-componentWillUnMount");
    clearInterval(this.messageAdder);
  }

  render() {
    console.log("DiscussionList-2-render");
    return this.state.messages;
  }
}
//==========================================
export default class Discussion extends Component {
  constructor() {
    super();
    console.log('Discussion-1-constructor');
    this.state = {
      pageTitle: "Discussion",
      currentTime: String(new Date())
    };
  }

  componentDidMount() {
    console.log("Discussion-3-componentDidMount");
    
    this.liveTime = setInterval(() => {
      this.setState({
        currentTime: String(new Date())
      });
    }, 1000);
    
  }

  componentWillUnmount() {
    console.log("Discussion-last-componentWillUnmount");
    clearInterval(this.liveTime);
  }

  render() {
    const { pageTitle } = this.state;
    console.log("Discussion-2-render");
    return (
      <div>
        <h1>{pageTitle}</h1>
        <div>{this.state.currentTime}</div>
        <DiscussionList />
      </div>
    );
  }
}
//<DiscussionList />
//https://github.com/jordanhudgens/ReactComponentLifecycleDeepDive/tree/master/src/components
/*see console.log for sequence

---when enter page----------------------
Discussion-1-constructor
Discussion-2-render
DisCussionList-1-constructor
DiscussionList-2-render
DiscussionMessage
DiscussionMessage
DiscussionList-3-componentDidMount
Discussion-3-componentDidMount
DiscussionList-2-render*5

---when leave page------------------------
Discussion-last-componentWillUnmount
DiscussionList-last-componentWillUnmount


*/