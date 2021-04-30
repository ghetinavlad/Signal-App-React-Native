import React, { useLayoutEffect, useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback} from 'react-native';
import {Avatar} from 'react-native-elements';
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';
import  firebase from "firebase";
import {auth, db} from '../firebase';

const ChatScreen = ({navigation, route}) => {

    const [input, setInput] =  useState('');
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() =>{
        navigation.setOptions({
            title:'Chat',
            headerTitleAlign:'left',
            headerBackTitleVisible:false,
            headerTitle:() => (
                <View style={styles.containerLeft}>
                    <Avatar
                        rounded
                        source={{uri:"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}}
                    />
                    <Text style={styles.text}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerLeft:() => (
                <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={navigation.goBack}
                >
                    <AntDesign name='arrowleft' size={24} color='#fff' />
                </TouchableOpacity>
            ),
            headerRight:() => (
                <View style={styles.containerRight}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='#fff' />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss();

        db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })

        setInput('');
    };
    
    useLayoutEffect(() => {
        const unsubscribe = 
           db
             .collection('chats')
             .doc(route.params.id)
             .collection('messages')
             .orderBy('timestamp', 'desc')
             .onSnapshot(snapshot => setMessages(
                 snapshot.docs.map(doc => ({
                     id:doc.id,
                     data:doc.data()
                 }))
             ));

        return unsubscribe;
    }, [route])

    
    return (
        
            <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
                <StatusBar style='light' />
                <KeyboardAvoidingView
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                    keyboardVerticalOffset={90}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <>
                        <ScrollView contentContainerStyle={{paddingTop:15}}>
                            {messages.map(({id, data}) => 
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.receiver}>
                                        <Avatar
                                            position='absolute'
                                            rounded
                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{
                                                uri:data.photoURL
                                            }}
                                        
                                        />
                                        <Text style={styles.receiverText}>
                                            {data.message}
                                        </Text>
                                    </View>
                                ):
                                (
                                    <View style={styles.sender}>
                                        <Avatar
                                            position='absolute'
                                            rounded
                                            bottom={-15}
                                            left={-5}
                                            size={30}
                                            source={{
                                                uri:data.photoURL
                                            }}
                                        
                                        />
                                        <Text style={styles.senderText}>
                                            {data.message}
                                        </Text>
                                    </View>
                                )
                            )}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                placeholder="Signal Message"
                                style={styles.textInput}
                                vlaue={input}
                                onChangeText={text => setInput(text)}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity
                                onPress={sendMessage}
                                activeOpacity={0.5}
                            >
                                <Ionicons name='send' size={24} color='#2b68e6' />
                            </TouchableOpacity>
                        </View>
                        </>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    containerLeft:{
        flexDirection:'row',
        alignItems:'center'
    },
    containerRight:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:80,
        marginRight:20
    },
    text:{
        color:'white',
        marginLeft:10,
        fontWeight:'700'
    },
    goBackButton:{
        marginLeft:10
    },
    container:{
        flex:1
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:'transparent',
        backgroundColor:'#ececec',
        borderWidth:1,
        padding:10,
        color:'grey',
        borderRadius:30
    },
    receiver:{
        padding:15,
        backgroundColor:'#ececec',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:"relative"
    },
    sender:{
        padding:15,
        backgroundColor:'#2b68e6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:'80%',
        position:'relative'
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:'#fff'
    },
    senderText:{
        color:'#fff',
        fontWeight:'500',
        marginLeft:10,
        marginBottom:15
    },
    receiverText:{
        color:'#000',
        fontWeight:'500',
        marginLeft:10
    }
})  