import React, { Component, } from 'react';
import { StatusBar, Navigator,StyleSheet } from 'react-native';
import { Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { loginUserByToken } from './actions/Auth/login';
import Home from './containers/Home';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import User from './containers/User/User';
import UserFavorites from './containers/User/UserFavorites';
import UserDownloads from './containers/User/UserDownloads';
import Media from './containers/Media/Media';
import Medias from './containers/Media/Medias';
import MediaComments from './containers/Media/MediaComments';
import MediaFavorites from './containers/Media/MediaFavorites';
import MediaDownloads from './containers/Media/MediaDownloads';
import MediaCapture from './containers/Media/MediaCapture';
import UserMedias from './containers/User/UserMedias';
import Followers from './containers/User/Followers';
import Followings from './containers/User/Followings';
import Settings from './containers/Settings';
import TabIcon from './components/TabIcon';
import LoginDialog from './components/LoginDialog';

const scenes = Actions.create(

  //@todo : fix nav styles, #rnrf issue
  <Scene key="modal" component={Modal} >

    <Scene key="root" hideNavBar={true} component={Modal}>

      <Scene key="tabBar" tabs={true}
             navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
             tabBarStyle={{backgroundColor:'#343459', justifyContent:'center', alignItems:'center', alignSelf:'center', height:40, paddingTop:10}}
             default="mediasRouter" selector={props=>props.default}
      >

        <Scene key="settingsTab" component={Settings} icon={TabIcon} selectedTabIcon="ion|ios-gear" tabIcon="ion|ios-gear-outline"
               navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
               titleStyle={{ color:'white', fontSize:17}}
               barButtonTextStyle={{ fontSize:17, color:'white' }}
               title="Settings"
        />

        <Scene key="downloadsTab" component={UserDownloads} icon={TabIcon} selectedTabIcon="ion|android-star" tabIcon="ion|android-star-outline"
               navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
               titleStyle={{ color:'white', fontSize:17}}
               barButtonTextStyle={{ fontSize:17, color:'white' }}
        />

        <Scene key="favoritesTab" component={UserFavorites} icon={TabIcon} selectedTabIcon="ion|android-favorite" tabIcon="ion|android-favorite-outline"
               navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
               titleStyle={{ color:'white', fontSize:17}}
               barButtonTextStyle={{ fontSize:17, color:'white' }}
        />

        <Scene initial={true} key="mediasRouter" icon={TabIcon} selectedTabIcon="ion|briefcase" tabIcon="ion|briefcase"
               navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
               titleStyle={{ color:'white', fontSize:17}}
               barButtonTextStyle={{ fontSize:17, color:'white' }}
        >
          <Scene key="mediasScene"  component={Medias} rightTitle="+" onRight={() => Actions.mediaCapture()}
          />
          <Scene key="mediaScene" component={Media}
          />
          <Scene key="mediaCommentsScene" component={MediaComments}
          />
          <Scene key="mediaFavoritesScene" component={MediaFavorites}
          />
          <Scene key="mediaDownloadsScene" component={MediaDownloads}
          />
          <Scene key="userMediasScene" component={UserMedias}
          />
          <Scene key="followersScene" component={Followers}
          />
          <Scene key="followingsScene" component={Followings}
          />
          <Scene key="userScene" component={User}
          />

        </Scene>

        <Scene key="home" hideNavBar={true} component={Home} icon={TabIcon} selectedTabIcon="ion|ios-home" tabIcon="ion|ios-home-outline" />

      </Scene>

      <Scene key="mediaCapture" hideNavBar={true} component={MediaCapture}  />
      <Scene key="loginDialog"  hideNavBar={true}  component={LoginDialog} />
      <Scene key="login" hideNavBar={true} component={Login}  />
      <Scene key="register" component={Register} hideNavBar={true} title="تسجيل الدخول"   />

    </Scene>

  </Scene>

);

class App extends Component {

  componentDidMount() {
    //warning(false, "ScrollView doesn't take rejection well - scrolls anyway");

    StatusBar.barStyle = 'light-content';
    const {dispatch} = this.props;
    dispatch(loginUserByToken()).then((success)=>{
      if(success) {
        //Actions.tabBar();
      }
    });
  }

  render() {
    return (
      <Router createReducer={reducerCreate} sceneStyle={styles.container} scenes={scenes} />
    );
  }
}

const reducerCreate = params=>{
  const defaultReducer = Reducer(params);
  return (state, action)=>{
    console.log("ACTION:", action);
    return defaultReducer(state, action);
  }
};

function mapStateToProps(state) {
  return {
    ...state
  }
}

const styles=  StyleSheet.create({
  container: {
    backgroundColor:"white"
  }
});

export default connect(mapStateToProps)(App);
