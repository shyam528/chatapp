import React from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';

class Footer extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      message: '',
	    };
	}
	render() {
		return (
			<View style={styles.container}>
				<TextInput style={{height: 60, color:'black',borderBottomWidth: 0, borderBottomColor: 'white',fontSize:20}}
					onChangeText={this.props.onChange}
					value={this.props.value}
					autoCapitalize={'none'}
					autoCorrect={false}
					clearButtonMode={"while-editing"} 
					onSubmitEditing={this.props.onSubmit}
					autoFocus={true}
					placeholder={'Type your message'}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor : 'white',
		position: 'absolute',
		bottom:0,
		height: 50,
		width: Dimensions.get('window').width -20,
		borderRadius:10,
		marginLeft:10,
		marginRight:10,
		marginBottom:10,
	}
})

export default Footer;
