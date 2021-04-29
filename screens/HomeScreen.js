import React, { useLayoutEffect } from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import CustomListItem from '../components/CustomListItem';
import {auth, db} from '../firebase';
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace('login');
        
    });
};


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
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color='black' />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])

    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({

})