import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
export default props => {
    const navigation = useNavigation();
    const acoes = props.dado.text;
    const resgate = props.dado.value;

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.corpo}>
                    <Text style={styles.text}>DADOS INVÁLIDOS</Text>
                    <Text style={{
                        fontSize: 14,
                        textAlign: 'center',
                        justifyContent: 'flex-end',
                    }}>Você preencheu um ou mais campos com valor acima do permitido</Text>
                </View>
                {acoes.map((dado, i) =>
                    <View
                        key={i}
                    >
                        <Text style={{
                            fontSize: 14,
                            textAlign: 'center',
                            justifyContent: 'flex-start',
                        }}>{dado && dado.nome} Valor máximo de {(resgate.saldoTotal * resgate.acoes[i].percentual / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                        {/* <Text> {dado.nome} Valor máximo de </Text>  */}
                    </View>
                )}
                <View style={styles.button}>
                    <Button style={{ backgroundColor: 'red', color: 'red', fontWeight: 'bold' }} title='CORRIGIR' onPress={() => navigation.goBack('ResgateInvestimento')} />
                    {/* <Button title='CORRIGIR' onPress={() => console.log('resgate.acoes[i]', resgate.acoes[i], 'resgate.saldoTotal', resgate.saldoTotal)} /> */}
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
        backgroundColor: 'red',
        color: 'red',
        fontWeight: 'bold'
    },
    corpo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
});