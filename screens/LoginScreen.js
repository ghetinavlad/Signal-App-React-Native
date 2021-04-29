import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import {Button, Input, Image} from 'react-native-elements';
import {StatusBar} from 'expo-status-bar';
import { auth } from '../firebase';


const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            //console.log(authUser);
            if(authUser){
                navigation.replace('home');
            }
        });
        return unsubscribe;
    }, []);

    const signIn = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .catch(error => alert(error));

    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image
                style={styles.image}
                source={{
                    uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                }}
            />

            <View style={styles.inputContainer}>
                <Input
                     placeholder="Email"
                     autoFocus type="Email"
                     value={email}
                     onChangeText={text => setEmail(text)}
                />
                <Input
                     placeholder="Password"
                     type="password"
                     secureTextEntry type="Password"
                     value={password}
                     onChangeText={text => setPassword(text)}
                     onSubmitEditing={signIn}
                />
            </View>

            <Button
               containerStyle={styles.button}
               onPress={signIn}
               title="Login"
            />
            <Button
               containerStyle={styles.button}
               onPress={() => navigation.navigate('register')}
               type="outline"
               title="Register"
            />

            <View style={{height:100}} />

        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    image:{
        width:200,
        height:200
    },
    inputContainer:{
        width:300
    },
    button:{
        width:210,
        marginTop:10
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'#fff'
    }

})