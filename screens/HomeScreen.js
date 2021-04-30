import React, { useEffect, useLayoutEffect, useState } from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import CustomListItem from '../components/CustomListItem';
import {auth, db} from '../firebase';
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([]);

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace('login');
        
    });
};

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot =>(
            setChats(
              snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data(),
            })))
        ));

        return unsubscribe;
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Signal",
            headerStyle:{backgroundColor:'#fff'},
            headerTitleStyle:{color:'#000'},
            headerTintColor:'#000',
            headerLeft:() => (  
                <View style={{marginLeft:20}}>
                    <TouchableOpacity
                         activeOpacity={0.5}
                         onPress={signOut}
                    >
                        <Avatar 
                            rounded
                            source={{uri: auth?.currentUser?.photoURL }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight:() => (
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    width:80,
                    marginRight:20
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity
                     activeOpacity={0.5}
                     onPress={() => navigation.navigate("addChat")}
                    >
                        <SimpleLineIcons name='pencil' size={24} color='black' />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate('chat', {
            id,
            chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data:{chatName}}) => (
                    <CustomListItem
                        key={id}
                        id={id} 
                        chatName={chatName}
                        enterChat={enterChat}
                    />

                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        height:'100%'
    }
})