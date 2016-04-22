# React Native 开发的一个新闻客户端

###初学React Native做的第一个Demo项目，对新手有帮助

###简介
> 本项目模仿百度百家的手机端页面做成的[http://baijia.baidu.com/](http://baijia.baidu.com/)，API接口也是用的百度百家的数据。

![](https://raw.githubusercontent.com/safetydoor/rn-news/master/images/image1.png)

![](https://raw.githubusercontent.com/safetydoor/rn-news/master/images/image2.png)


1. 主页是一个Navigator
2. 列表页使用的Listview，可以点击加载更多，点击列表项进入详细页面
3. 详细页面使用的是一个WebView
4. 详细页可以点击返回回到主页


###总结
1. 类的创建有2种方式

第一种:
`
var NavigationBar = React.createClass({...});//不要忘记了括号
module.exports = NavigationBar;//导出组件方式
`

第二种:
`
class NavigationBar extends Component{...}
export default NavigationBar;//导出组件方式
`
