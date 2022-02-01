import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
export default props => {
    const acoes = props.dado.text;
    const resgate = props.dado.value;
    console.log('acoes', acoes)
    function validarCampo() {
        for (let x in acoes) {

        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.corpo}>
                    <Text style={styles.text}>DADOS INVÁLIDOS</Text>
                    <View style={{
                        marginRight: 'auto'
                    }}>
                        <Text style={{
                            fontSize: 14,
                            margin: 7,
                            marginRight: 'auto',
                            color: '#5A817D'
                        }}>Você preencheu um ou mais campos com valor acima do permitido</Text>
                    </View>
                </View>
                {acoes.map((dado, i) =>
                    <View
                        key={i}
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            margin: 5

                        }}
                    >
                        {acoes[i] && acoes[i].erro === true &&
                            <Text style={{
                                fontSize: 12,
                                textAlign: 'center',
                                justifyContent: 'flex-start',
                                position: 'relative',
                                marginRight: 'auto',
                                color: '#5A817D'
                            }}>{dado && dado.nome} Valor máximo de {(resgate.saldoTotal * resgate.acoes[i].percentual / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                        }
                    </View>
                )}
                <View style={styles.button}>
                    <Button title='CORRIGIR' onPress={props.closeModal} />
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
        margin: 20
    },
    modal: {

        backgroundColor: '#FFFEF1',
        width: '100%',
        height: 300,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50
    },
    text: {
        textAlign: 'center',
        justifyContent: 'flex-start',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5A817D'
    },
    button: {
        justifyContent: 'flex-end',
        fontWeight: 'bold',
        backgroundColor: '#FFF003', 
        color: '1e72b0', 
        fontWeight: 'bold' 
    },
    corpo: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 30
    }
});