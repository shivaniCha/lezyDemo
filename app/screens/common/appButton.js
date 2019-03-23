import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity, View,
} from "react-native";
import Constant from '../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';

const AppButton = (props) => {
    const {btnOuter,btnText} = styles;
    const {title, onPress, extraStyle, containerStyle,textStyle} = props;
    return(
        <TouchableOpacity style={[btnOuter,containerStyle && containerStyle]}
                          onPress={onPress}>
            <Text style={[btnText,textStyle&&textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    btnOuter:{
        alignItems:'center',justifyContent:'center',
        paddingVertical:hp('1.5%'),
        backgroundColor:Constant.color.lightblue,borderRadius:5
    },
    btnText:{
        color:Constant.color.white,
        fontSize:Constant.fontSize.small,
        fontFamily:Constant.font.linateHeavy
    }
});

export {AppButton};
