import React from 'react';
import { View, Text, AsyncStorage, ScrollView, Image } from 'react-native';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';
import Video from 'react-native-video';
import styles from "./style";
import Footer from './footer';
import Header from './header';

const USER_ID = '@userId';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
    };
    
    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);

    this.socket = SocketIOClient('http://192.168.0.9:3000', { transports: ['websocket'] });
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  ChangeTextInput = (inputText: string) => {
    this.setState({
      inputText,
    })
  };

  onSubmitTextInput = () => {
    var message = this.state.inputText;
    var message = {
        user: { _id : 1},
        createdAt: new Date(),
        data: {text:message, type:'text'} ,
    }
    this.state.messages.push(message);
    this.socket.emit('message', message);
    this.setState({
      inputText: '',
    })
  };

  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
        // If there isn't a stored userId, then fetch one from the server.
        if (!userId) {
          this.socket.emit('userJoined', null);
          this.socket.on('userJoined', (userId) => {
            console.log("userId",userId);
            AsyncStorage.setItem(USER_ID, userId);
            this.setState({ userId });
          });
        } else {
          this.socket.emit('userJoined', userId);
          this.setState({ userId });
        }
      })
      .catch((e) => alert(e));
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage(messages) {
    this.state.messages.push(messages[0])
    this.forceUpdate()
  }

  
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <View style={styles.chatContent}>
          <ScrollView  removeClippedSubviews={false} overScrollMode={'always'} contentContainerStyle={{ flexGrow: 1 }}>
            {this.state.messages.map((prop, key) => {
              if(prop.data.type === 'text') {
                if(prop.user._id === 'robot') {
                  return (
                    <View key={key} style={styles.botMessage}>
                      <Text style={styles.text}>{prop.data.text}</Text>
                    </View>
                  );
                } 
                if(prop.user._id !== 'robot') {
                  return (
                    <View key={key} style={styles.userMessage}>
                      <Text style={styles.text}>{prop.data.text}</Text>
                    </View>
                  );
                }
              }
              if(prop.data.type === 'image') {
                if(prop.user._id === 'robot') {
                  return (
                    <View key={key} style={styles.botMessage}>
                      <Image style={{width: 80, height: 60, marginLeft:2, marginRight:2}} source={{uri:prop.data.file_url}} />
                    </View>
                  );
                } 
              }
              if(prop.data.type === 'audio') {
                if(prop.user._id === 'robot') {
                  return (
                    <View key={key} style={styles.botMessage}>
                      <Text style={styles.text}>{prop.data.text}</Text>
                    </View>
                  );
                } 
              }
              if(prop.data.type === 'video') {
                if(prop.user._id === 'robot') {
                  return (
                    <View key={key} style={styles.botMessage}>
                      <Video source={{uri: prop.data.file_url}}   
                        ref={(ref) => {this.player = ref}}                                     
                        rate={1.0}                              
                        volume={1.0}                            
                        muted={false}                          
                        paused={false}                         
                        resizeMode="cover"                     
                        repeat={true}                           
                        playInBackground={false}               
                        playWhenInactive={false}               
                        progressUpdateInterval={250.0}     
                        onLoadStart={this.loadStart}           
                        onLoad={this.setDuration}               
                        onProgress={this.setTime}               
                        onEnd={this.onEnd}                      
                        onError={this.videoError}               
                        onBuffer={this.onBuffer}                
                        onTimedMetadata={this.onTimedMetadata}  
                        style={{height:100,width:150 }} 
                      />
                    </View>
                  );
                } 
              }
              if(prop.data.type === 'carousel') {
                if(prop.user._id === 'robot') {
                  return (
                    <View key={key} style={styles.botMessage}>
                      <Text style={styles.text}>{prop.data.text}</Text>
                    </View>
                  );
                } 
              }
            })}
          </ScrollView>
        </View>
        <Footer 
          onChange={this.ChangeTextInput} 
          value={this.state.inputText}
          onSubmit={this.onSubmitTextInput}
        />
      </View>
    );
  }
}

module.exports = Main;
