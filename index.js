import { AppRegistry } from 'react-native';
import Main from './client';
console.ignoredYellowBox = ['Remote debugger is in a background'];
AppRegistry.registerComponent('masterChatApp', () => Main);
