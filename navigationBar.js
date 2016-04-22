import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

var NavigationBar = React.createClass({


	render:function(){
		console.log('NavigationBar render');
		if (this.props.canBack) {
			return (
				<View style={styles.navigationBar}>
					<TouchableOpacity onPress={this.onBackPressed} >
						<Image style={styles.back} source={require('./images/back.png')}/>
					</TouchableOpacity>
					<Image style={styles.logo} source={require('./images/baijia_logo.png')}/>
				</View>
			);
		}else{
			return (
				<View style={styles.navigationBar}>
					<Image style={styles.logo} source={require('./images/baijia_logo.png')}/>
				</View>
			);
		}
		
	},

	onBackPressed:function(){
		this.props.navigator.pop();
	}

});

var styles = StyleSheet.create({
	navigationBar:{
		backgroundColor:'#262627',
		height:60,
		paddingTop:20,
	},
	logo:{
		width:51,
		height:40,
		alignSelf:'center',
	},
	back:{
		width:30,
		height:40,
		position:'absolute',
	},
});

module.exports = NavigationBar;