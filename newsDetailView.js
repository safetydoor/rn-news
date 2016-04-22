/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  Text,
  WebView,
} from 'react-native';
var NavigationBar = require('./navigationBar');

var WEBVIEW_REF = 'webview';

var NewsDetailView = React.createClass({

  render() {
    console.log('NewsDetailView render :' + this.props.url);
    return (
      <View style={styles.container}>
        <NavigationBar canBack={true} navigator={this.props.navigator}/>
        <WebView
            ref={WEBVIEW_REF}
            style={styles.webview}
            automaticallyAdjustContentInsets={false}
            source={{uri: this.props.url}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            startInLoadingState={true}
            scalesPageToFit={true}
          />
      </View>
    );
  } 
});

module.exports = NewsDetailView;

var styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    flex:1,
  },

  webview:{
    backgroundColor:'#ffffff',
  },
});
