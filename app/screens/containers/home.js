import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constant from '../../helper/themeHelper';

export default class Home extends Component {

    render() {
        const {container,text} = styles;
        return (
            <View style={container}>
                <Text style={text}>
                    {'Welcome....'}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Constant.color.text
    },
    text:{
        fontSize:Constant.fontSize.small,
        color: Constant.color.white
    }
});