import React, { PropTypes, Component } from 'react';
import {  StyleSheet, Navigator, Text, View, Image  } from 'react-native';
import { Icon } from 'react-native-icons';

export default class TabIcon extends Component {

  static propTypes = {
    selectedTabIcon:PropTypes.string.isRequired,
    tabIcon:PropTypes.string.isRequired
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon
          name={this.props.selected ? this.props.selectedTabIcon : this.props.tabIcon }
          size={22}
          color={ this.props.selected ? '#66b2ff' :'#FFFFFF'}
          style={{width:22,height:22,alignSelf:'center',fontWeight:'300',}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    paddingBottom:10
  }
});