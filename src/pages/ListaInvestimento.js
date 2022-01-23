import React, { useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResgateInvestimento from './ResgateInvestimento'
const Stack = createNativeStackNavigator();

export default function ListaInvestimento(navigation) {
    const [value, setValue] = useState([]);

    useEffect(() => {
        // console.log("navigation", navigation.navigation)
        try {
            fetch('https://run.mocky.io/v3/ca4ec77d-b941-4477-8a7f-95d4daf7a653')
                .then((response) => response.json())
                .then((json) => setValue(json.response.data.listaInvestimentos));
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (

        <View style={styles.container}>
            <SafeAreaView >
                <ScrollView >
                    <View style={styles.header}>
                        <Text style={styles.texto}>Resgate</Text>
                    </View>
                    <View >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{ color: '#4B4B4B', padding: 7, margin: 7 }}>INVESTIMENTOS</Text>
                            <Text style={{ color: '#4B4B4B', padding: 7, margin: 7 }}>R$</Text>
                        </View>

                        {value.map((dado, i) =>
                            
                            <View
                                key={i}
                                style={{
                                    height: 70,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    backgroundColor: dado.indicadorCarencia === "S"? '#ffffff' : '#ffffff',
                                    marginBottom: 2
                                }}
                                onTouchEndCapture={() =>
                                    dado.indicadorCarencia === "N"?  navigation.navigation.navigate('ResgateInvestimento', { dado } ) : alert('não é possiel')
                                }
                            >
                                <Text style={{
                                    color:  dado.indicadorCarencia === "S" ? '#B2B1B1' : '#000000', 
                                    padding: 7,
                                    margin: 7,
                                    fontWeight: 'bold',
                                    fontSize: 17
                                }}>
                                    {dado.nome}{"\n"}



                                    <Text style={{ fontSize: 12, fontWeight: '100', color: '#656565' }}>{dado.objetivo} </Text>
                                </Text>
                                <Text style={{ color: dado.indicadorCarencia === "S" ? '#B2B1B1' : '#000000', padding: 7, margin: 7, fontWeight: 'bold' }}>{dado.saldoTotal.toLocaleString('pt-BR', { currency: 'BRL' })}</Text>
                               
                            </View>
                        )}
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eaeaea",
        flex: 1,
        padding: 0,
        paddingHorizontal: 0,
        width: '100%',
    },
    header: {
        margin: 0,
        // position: 'absolute',
        // overflow: 'hidden',
        backgroundColor: '#1e72b0',
        top: 0,
        height: 120,
        width: '100%',
        borderBottomWidth: 8,
        borderBottomColor: '#Fdfa5e'
    },
    texto: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 60,
        fontSize: 25,
        fontWeight: 'bold'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    model: {
        flexWrap: 'wrap',
        // alignItems: 'flex-start',
        // flexDirection:'row',
        padding: 0,
        margin: 10,
    },

});
