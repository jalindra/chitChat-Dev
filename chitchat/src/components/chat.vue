<template>
  <div>
    <div v-if="!connected" >
      <b-form inline>
        <label class="sr-only" for="inline-form-input-name">Name</label>
        <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Jane Doe"></b-input>

        <label class="sr-only" for="inline-form-input-username">Username</label>
        <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input id="inline-form-input-username" v-model="username" placeholder="Username"></b-input>
        </b-input-group>

        <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>

        <b-button variant="primary" v-on:click="connect">Join</b-button>
      </b-form>
    </div>
    <div v-else >
      <div class="row" >
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <ul id="mylist">
            <div v-for="eachmessage in recievedMessages" :key="eachmessage.id">
              <ul v-if="eachmessage.sender==username" id="sameUser">
               
                <b-avatar size="4em" variant="success">{{eachmessage.sender}}</b-avatar>
                {{eachmessage.content}}
               
              </ul>
               <ul v-else id="otherUser">
               
                <b-avatar size="4em" variant="success">{{eachmessage.sender}}</b-avatar>
                {{eachmessage.content}}
              
              </ul>
            </div>
          </ul>
        </div>
        <div class="col-md-2"></div>
      </div>

      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-6">
          <label class="sr-only" for="inline-form-input-name">Name</label>
          <b-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Start Typing"
            v-model="Text"
          ></b-input>
        </div>
        <div class="col-md-2">
          <b-button variant="primary" v-on:click="sendMessage">send</b-button>
        </div>

        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>




<script>
import socketJs from "sockjs-client";
import stomp from "webstomp-client";


export default {
  name: "chat",
  data() {
    return {
      message: {
        type: null,
        content: null,
        sender: null,
      },
      recievedMessages: [],
      stompClient: null,
      username: null,
      connected: false,
      Text: null,
    };
  },
  methods: {
    connect() {
      var url = "http://localhost:8082/ws";
      this.socket = new socketJs(url);
      this.stompClient = stomp.over(this.socket);
      this.connected = true;

      this.stompClient.connect(
        {},
        (Frame) => {
          console.log(Frame);
          this.stompClient.subscribe("/topic/public", (payLoad) => {
            const mess = JSON.parse(payLoad.body);

            this.recievedMessages.push(mess)

          });
          this.stompClient.send(
            "/app/chat.addUser",
            JSON.stringify({ sender: this.username, type: "JOIN" }),
            {}
          );
        },
        (error) => {
          console.log("ops sorry we could not connect to server" + error.body);
        }
      );
    },
    sendMessage() {
      var messageContent = this.Text;

      if (messageContent && this.stompClient) {
        var chatMessage = {
          sender: this.username,
          content: this.Text,
          type: "CHAT",
        };

        this.stompClient.send(
          "/app/chat.sendMessage",
          JSON.stringify(chatMessage),
          {}
        );
      }
    },
  },
};
</script>

<style>
#mylist {
  width: 1000px;
  height: 400px;
  padding: 20px;
  background-color: rgba(0, 123, 255, 0.25);
  overflow-y: auto;
  background-image:url(https://www.wpclipart.com/blanks/callouts/chatting_icon.png)
}
#sameUser {
  text-align: end;
  padding-top:5px;
}
#otherUser{
  text-align: start;
  padding-top:5px;
}
</style>