import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

class Header extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={{fontSize: 20, color:'black', textAlign: 'center', marginTop:8}}>PC Shopping Smart Assistant</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor : 'white',
		position: 'absolute',
		top:0,
		height: 40,
		width: Dimensions.get('window').width,
	}
})

export default Header;
