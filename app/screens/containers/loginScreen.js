import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text,
    TouchableOpacity,Keyboard,StatusBar,
    View, TextInput, Image} from 'react-native';
import Constant from '../../helper/themeHelper';
import {AppButton} from "../common";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';
import {isValidUserName} from "../../helper/appHelper";
import {connect} from "react-redux";
import {userRegistration} from "../../actions/user";
import {StackActions,NavigationActions} from "react-navigation";

class UserLogin extends Component{

    constructor(props){
        super(props);
        this.state = {
            userName:'',
            password:'',
            rememberMe:false,
            showPassword: false,
        }
    }

    onRememberMe = () => {
        this.setState({
            rememberMe: !this.state.rememberMe
        });
    };

    onShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    onSocialMedia = (type) => {

    };

    //On User login
    onLogin = () => {
        const {userName,password} = this.state;
        const {userRegistration,navigation} = this.props;
        Keyboard.dismiss();
        if(!isValidUserName(userName)){
            alert('Please enter valid Username')
        }else if(password.length === 0){
            alert('Please enter your Password')
        }else{
            userRegistration({
                in_Username: userName,
                in_Password: password
            }).then(res=>{
                if(res){
                    if(res.status === '200'){
                        navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({
                                routeName: 'Home',
                            })],
                        }));
                    }else{
                        alert(res.message);
                    }
                }
            }).catch(e=>{
                console.log(e);
            });
        }
    };

    onForgotPassword = () => {

    };

    onEmailBlur = () => {
        if(this.refs.txtPassword){
            this.refs.txtPassword.focus();
        }
    };

    render() {
        const {container,textTitle,subTitle,inputIcon,inputRightIcon,
            socialIcon,inputLabel,textInput,inputContainer,bottomText} = styles;
        const {userName,password,rememberMe,showPassword} = this.state;
        return (
            <SafeAreaView style={container}>
                <StatusBar backgroundColor={Constant.color.header} barStyle="light-content" />
                <View style={{backgroundColor:Constant.color.header}}>
                    <View style={{...Constant.style.container,flexDirection:'row',
                        justifyContent:'space-between',alignItems:'center',
                        paddingTop:hp('0.5%'),paddingBottom:hp('2.3%')}}>
                        <Image source={{uri:'logo_luzy'}}
                               style={{height: hp('5%'), // 70% of height device screen
                                   width: wp('30%') }}
                               resizeMode={'contain'}/>
                        <Image source={{uri:'menu_icon'}}
                               style={{height:hp('5%'), width:30}} resizeMode={'contain'}/>
                    </View>
                </View>

                <View style={{backgroundColor:Constant.color.blackColor,paddingVertical:hp('2.5%')}}>
                    <Text style={textTitle}>
                        {'SIGN IN'}
                    </Text>
                    <Text style={subTitle}>
                        {'with LUZY account.'}
                    </Text>
                    <View style={{width:Constant.screenWidth*0.85,alignSelf:'center'}}>
                        <Text style={inputLabel}>USERNAME:</Text>
                        <View style={inputContainer}>
                            <Image source={{uri:'placeholeder_email_icon'}}
                                   style={inputIcon} resizeMode={'contain'}/>
                            <TextInput placeholder={'Your email address'}
                                       numberOfLines={1}
                                       ref={'txtEmail'}
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       returnKeyType={'next'}
                                       placeholderTextColor={Constant.color.text}
                                       style={textInput}
                                       value={userName}
                                       onChangeText={(userName) => this.setState({userName})}
                                       onSubmitEditing={this.onEmailBlur}
                                       underlineColorAndroid={Constant.color.transparent}
                            />
                            {
                                isValidUserName(userName) &&
                                <Image source={{uri:'checked_icon'}}
                                       style={inputRightIcon} resizeMode={'contain'}/>
                            }

                        </View>
                        <Text style={inputLabel}>PASSWORD:</Text>
                        <View style={inputContainer}>
                            <Image source={{uri:'placeholeder_password_icon'}}
                                   style={inputIcon} resizeMode={'contain'}/>
                            <TextInput placeholder={'Your password'}
                                       numberOfLines={1}
                                       ref={'txtPassword'}
                                       placeholderTextColor={Constant.color.text}
                                       style={textInput}
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       value={password}
                                       onChangeText={(password) => this.setState({password})}
                                       underlineColorAndroid={Constant.color.transparent}
                                       secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={this.onShowPassword}>
                                <Image source={{uri:showPassword&&'show_password_on_icon'||'show_password_off_icon'}}
                                       style={inputRightIcon} resizeMode={'contain'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',marginTop:3,
                            marginBottom:hp('1.5%'),alignItems:'center',justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <TouchableOpacity onPress={this.onRememberMe}>
                                    <View style={{...inputRightIcon,borderRadius:5,borderColor:Constant.color.white,
                                        backgroundColor:rememberMe&&Constant.color.lightblue||Constant.color.transparent,
                                        padding:2,alignItems:'center',justifyContent:'center',borderWidth:2}}>
                                        {
                                            rememberMe &&
                                            <Image source={{uri:'remember_me_checkmark_icon'}}
                                                   style={{height:'100%', width:'100%'}} resizeMode={'contain'}/>
                                        }

                                    </View>
                                </TouchableOpacity>
                                <Text style={[bottomText,{color:Constant.color.white}]}>
                                    {'Remember me'}</Text>
                            </View>
                            <Text style={[bottomText,{color:Constant.color.white}]}>
                                {'Forgot your password'}</Text>
                        </View>
                        <AppButton
                            containerStyle={{backgroundColor:Constant.color.lightblue}}
                            textStyle={{color:Constant.color.white}}
                            title={'LOGIN'}
                            onPress={this.onLogin}
                        />
                    </View>
                </View>

                <View style={{backgroundColor:Constant.color.blue,alignItems:'center',paddingVertical:hp('2.5%')}}>
                    <Text style={textTitle}>
                        {'SIGN IN'}
                    </Text>
                    <Text style={subTitle}>
                        {'with your social media account.'}
                    </Text>
                    <View style={{flexDirection:'row', alignSelf:'center',marginTop:hp('1.5%')}}>
                        <Image source={{uri:'facebook_icon'}}
                               style={socialIcon} resizeMode={'contain'}/>
                        <Image source={{uri:'twitter_icon'}}
                               style={[socialIcon,{marginHorizontal:20}]} resizeMode={'contain'}/>
                        <Image source={{uri:'instagram_icon'}}
                               style={socialIcon} resizeMode={'contain'}/>
                    </View>
                </View>

                <View style={{backgroundColor:Constant.color.white,
                    flex:1,paddingVertical:hp('2.5%')}}>
                    <View style={{...Constant.style.container, flex:1}}>
                        <Text style={[textTitle,{color:Constant.color.text}]}>
                            {'SIGN UP'}
                        </Text>
                        <AppButton
                            containerStyle={{backgroundColor:Constant.color.text}}
                            textStyle={{color:Constant.color.white}}
                            title={'CREATE ACCOUNT'}
                        />
                    </View>
                    <View style={{...Constant.style.container,flexDirection:'row',
                        justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={{uri:'about_us_icon'}}
                                   style={inputRightIcon} resizeMode={'contain'}/>
                            <Text style={bottomText}>
                                {'About us'}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={{uri:'need_help_icon'}}
                                   style={inputRightIcon}
                                   resizeMode={'contain'}/>
                            <Text style={bottomText}>
                                {'Need help?'}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Constant.color.header
    },
    textTitle:{
        fontSize:Constant.fontSize.xlarge,
        fontFamily:Constant.font.linateBold,
        color:Constant.color.white,
        textAlign: 'center',
    },
    subTitle:{
        fontSize:Constant.fontSize.mini,
        fontFamily:Constant.font.robotoRegular,
        color:Constant.color.white,
        textAlign: 'center',
        marginTop:-5
    },
    socialIcon:{
        height:hp('6%'),
        width:hp('6%'),
    },
    inputContainer:{
        backgroundColor:Constant.color.textInput,
        padding:hp('0.5%'),
        flexDirection:'row',marginTop:3,
        borderRadius:5,
        marginBottom:15,alignItems:'center'
    },
    textInput:{
        fontSize:Constant.fontSize.mini,
        fontFamily:Constant.font.robotoRegular,
        padding:hp('1%'),
        color:Constant.color.white,flex:1
    },
    inputRightIcon:{
        height:hp('3%'),
        width:hp('3%')
    },
    inputIcon:{
        height:hp('4%'),
        width:hp('4%')},
    inputLabel:{
        fontSize:Constant.fontSize.mini,
        color:Constant.color.white,
        fontFamily:Constant.font.linateHeavy
    },
    bottomText:{
        fontSize:Constant.fontSize.mini,
        marginLeft:5,
        color:Constant.color.lightGray,
        fontFamily:Constant.font.robotoBold
    }
});

export default connect(null,{
    userRegistration
})(UserLogin);
