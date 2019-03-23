import React, {Component} from 'react';
import { StatusBar ,View, AsyncStorage} from 'react-native';
import { Provider , connect} from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist'
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './reducers/index';
import MyApp from './navigation/appNavigator';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, AppReducer);
let store = createStore(persistedReducer,applyMiddleware(thunk));
let persistor = persistStore(store);

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <View style={{flex:1}}>
                        <StatusBar hidden={false}/>
                        <MyApp />
                    </View>
                </PersistGate>
            </Provider>
        );
    }
}
