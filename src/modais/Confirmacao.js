import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';



export default props => {
    const navigation = useNavigation();
    

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.corpo}>
                    <Text style={styles.text}>O valor solicitado estará em sua conta em até 5 dias úteis!</Text>
                </View>
                <View style={styles.button}>
                    <Button title='NOVO RESGATE' onPress={() => navigation.navigate('Home')} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15
    },
    modal: {
        backgroundColor: '#fff',
        width: '100%',
        height: 350,
    },
    text: {
        textAlign: 'center',
        justifyContent: 'flex-end',
        fontSize: 20
    },
    button: {
        justifyContent: 'flex-end',
    },
    corpo:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
});