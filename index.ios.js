/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  Navigator,
} from 'react-native';

var NewsListView = require('./newsListView');

class BaiduNewsProject extends Component {

  render() {
    console.log('RNTestProject render');
    return (<Navigator initialRoute={{name:'newsListView', component:NewsListView}}
                configureScene={this.configureScene}
                renderScene={this.renderScene}/>);
  }

  configureScene(router){
    return Navigator.SceneConfigs.FadeAndroid;
  }
  
  renderScene(router, navigator){
    var Component = router.component;
    return <Component {...router.params} navigator={navigator} />
  }
}

AppRegistry.registerComponent('baiduNewsProject', () => BaiduNewsProject);
