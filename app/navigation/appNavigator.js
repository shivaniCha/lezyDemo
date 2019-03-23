import { createStackNavigator, createAppContainer } from 'react-navigation';
import UserLogin from './../screens/containers/loginScreen'
import Home from './../screens/containers/home'

const AppNavigator = createStackNavigator({
    UserLogin,
    Home,
},{
    headerMode:"none"
});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;