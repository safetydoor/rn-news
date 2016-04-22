/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
} from 'react-native';

var NewsDetailView = require('./newsDetailView');
var NavigationBar = require('./navigationBar');

const DEBUG = false;

var NewsListView = React.createClass({

  getInitialState: function(){
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      newsArray:[],
    };
  },

  componentDidMount: function(){
    this.pageIndex = 1;
    this.prevarticalid = '';
    if (!DEBUG) {
      var url = this.getNewsUrl(this.pageIndex, this.prevarticalid);
      this.fetchData(url);
    }else{
      var news = [{'m_image_url':'http://b.hiphotos.baidu.com/news/crop%3D0%2C7%2C550%2C330%3Bw%3D638/sign=fecc318c45a7d933abe7be33907bfd24/58ee3d6d55fbb2fbb269538a484a20a44723dcec.jpg',
                  'm_title':'微软面向开发者，奔向人工智能与增强现实的未来',
                  'm_writer_name':'laps',
                  'm_create_time':'12:40',
                  'm_display_url':'http://zhaglin.baijia.baidu.com/article/417001'}];
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(news),
          loaded: true,
          newsArray:[],
        });
    }
  },

  render: function() {
    console.log('NewsListView render');
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }else{
      return this.renderListView();
    }
  },

  renderLoadingView: function(){
    return (
      <View style={styles.loadView}>
        <Text style={styles.loadView_text}>
          Loading news...
        </Text>
      </View>
    );
  },

  renderListView: function(){
    console.log("renderListView: " + this.state.dataSource);
    return (
      <View style={styles.listContainer}>
        <NavigationBar canBack={false}/>
        <ListView dataSource={this.state.dataSource}
                renderRow={this.renderNewsItem}
                style={styles.listView}/>
      </View>
    );
  },

  renderNewsItem: function(news){
    if (news.isLoadView) {
      return this.loadMoreView();
    }else{
      return (
        <TouchableOpacity onPress={() => this.onNewsPressed(news.m_display_url)}>
          <View style={styles.listItem}>
            <Image style={styles.listItem_image}
                   source={{uri:news.m_image_url}}
            />
            <View style={styles.listItem_rightContainer}>
              <Text style={styles.listItem_title} numberOfLines={2}>{news.m_title}</Text>
              <Text style={styles.listItem_name_createTime} numberOfLines={1}>{news.m_writer_name} | {news.m_create_time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  },

  loadMoreView:function(){
    return (
      <TouchableOpacity onPress={this.onLoadMorePressed}>
        <Text style={styles.loadMore}>点击加载更多</Text>
      </TouchableOpacity>
    );
  },

  onLoadMorePressed:function(){

    var url = this.getNewsUrl(this.pageIndex, this.prevarticalid);
    this.fetchData(url);
  },

  onNewsPressed:function(url){
    if (this.props.navigator) {
      this.props.navigator.push({
              name:'newsDetail',
              component:NewsDetailView,
              params:{url:url},
            });
    }
  },

  fetchData:function(url){
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.logTime();

        var oldNewsArray = this.state.newsArray;
        if (oldNewsArray.length > 0) {
          oldNewsArray.pop();
        }
        var newNewsArray = oldNewsArray.concat(responseData.data.list);
        newNewsArray = newNewsArray.concat([{'isLoadView':true}]);
 
        this.logTime();

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newNewsArray),
          loaded: true,
          newsArray:newNewsArray,
        });
        this.pageIndex = this.pageIndex + 1;
        this.prevarticalid = responseData.data.list.pop().ID;
        console.log("this.prevarticalid : " + this.prevarticalid);
      })
      .done();
  },

  getNewsUrl: function(page, prevarticalid){
    if (page == "1") {
      prevarticalid = "";
    }
    return "http://baijia.baidu.com/ajax/labellatestarticle?page=" + page + "&pagesize=20&prevarticalid=" + prevarticalid +"&flagtogether=1&labelid=3";
  },

  logTime:function(){
    var mDate = new Date();
    var minutes = mDate.getMinutes();
    var seconds = mDate.getSeconds();
    var ms = mDate.getMilliseconds();
    console.log(minutes + ":" + seconds + ":" + ms);
  },
});

module.exports = NewsListView;


var styles = StyleSheet.create({
  loadView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadView_text:{
    fontSize: 30,
    color: '#000000',
  },

  listContainer:{
    flex:1,
  },

  listView:{
    marginTop:0,
    marginLeft:12,
    marginRight:12,
  },

  listItem:{
    borderBottomWidth:1,
    borderBottomColor:'#efefef',
    flexDirection:'row',
    paddingTop:12,
    paddingBottom:12,
  },

  listItem_image:{
    width:95,
    height:68,
  },

  listItem_rightContainer:{
    flex:1,
    flexDirection:'column',
    marginLeft:12,
    height:68
  },

  listItem_title:{
    color:'#262b31',
    height:44,
    fontSize:18,
  },

  listItem_name_createTime:{
    height:14,
    fontSize:13,
    color:'#9ca4ae',
  },

  loadMore:{
    marginTop:12,
    marginBottom:12,
    height:45,
    backgroundColor:'#e3e4ee',
    color:'#545454',
    textAlign:'center',
    fontSize:15,
    paddingTop:15,
  },

});
