import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
// import { TextInput } from 'react-native-paper';
import MaskInput, { Masks } from 'react-native-mask-input';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Confirmacao from '../modais/Confirmacao';
import ErrorResgate from '../modais/ErrorResgate'
var y
export default function ResgateInvestimento({ route, navigation }) {
    const [value, setValue] = useState(navigation.route.params.dado);
    const [text, setText] = useState([]);
    const [valorSoma, setValorSoma] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleErro, setModalVisibleErro] = useState(false);
    function showModal() {
        for (let x in text) {
            const dado = text[x]
            if (dado && dado.erro === true) {
                setModalVisibleErro(true)
                return;
            }
        }
        console.log(text)
        if (text.length == 0) {
            alert('Selecione um valor valido.')
            return;
        } else {
            setModalVisible(true)
        }
    }

    function valorResgate(texto, dado, x) {
        let formatar = texto.replace('R$', '').replace('.', '').replace(' ', '');
        let formatarMoeda = formatar.replace(',', '.')
        let soma = 0;
        const array = [...text];
        y = x
        array[x] = {
            ...dado,
            valorResgatar: formatarMoeda,
            erro: formatarMoeda > (dado.percentual * value.saldoTotal / 100) ? true : false
        }
        setText(array)
        for (let x in array) {

            if (array[x]) {
                soma += parseFloat(array[x].valorResgatar);
                setValorSoma(soma)
            } else {
                setValorSoma(soma)
            }
        }
    }
    return (
        <View style={styles.container}>
            <SafeAreaView >
                <ScrollView >
                    <View style={styles.header}>
                        <Text style={styles.texto}>Resgate</Text>
                    </View>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{ color: '#4B4B4B', padding: 7, margin: 7 }}>DADOS DO INVESTIMENTO</Text>
                        </View>
                    </View>

                    <View style={styles.viewA}>
                        <Text style={styles.viewB}>NOME</Text>
                        <Text style={styles.textA}>{value.nome}</Text>
                    </View>
                    <View
                        style={styles.viewA}
                    >
                        <Text style={styles.viewB}>Saldo total disponível</Text>
                        <Text style={styles.textA}>{value.saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{ color: '#4B4B4B', padding: 7, margin: 7 }}>RESGATE DO SEU JEITO</Text>
                    </View>

                    {value.acoes.map((dado, i) =>
                        <View
                            key={i}
                        >
                            <View style={styles.viewA}>
                                <Text style={styles.viewB}>Ação</Text>
                                <Text style={styles.textA}>{dado.nome}</Text>
                            </View>

                            <View style={styles.viewA}>
                                <Text style={styles.viewB}>Saldo acumulado</Text>
                                <Text style={styles.textA}>{(dado.percentual * value.saldoTotal / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                            </View>
                            <View
                                style={{
                                    backgroundColor: '#ffffff',
                                    marginBottom: 2
                                }}
                            >
                                <MaskInput
                                    style={{
                                        borderRadius: 0,
                                        backgroundColor: '#fff',
                                        color: '#1e72b0',
                                        height: 50,
                                        margin: 7,
                                        padding: 7
                                    }}
                                    placeholder='Valor a resgatar'
                                    keyboardType="numeric"
                                    mask={Masks.BRL_CURRENCY}
                                    // value={resgate[item.id] && resgate[item.id].valorResgatar || ''}
                                    value={text[i] && text[i].valorResgatar || ''}

                                    onChangeText={(texto) => valorResgate(texto, dado, i)}

                                />
                                {text[i] && text[i].erro &&
                                    <View >
                                        <Text style={{ color: 'red' }}>Valor não pode ser maior que {(dado.percentual * value.saldoTotal / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                                    </View>
                                }
                            </View>
                        </View>

                    )}
                    <View style={{
                        height: 50,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#ffffff',
                    }}>
                        <Text style={styles.viewB}>Valor total a resgatar</Text>
                        <Text style={styles.textA}>{valorSoma.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                    </View>
                    <Button
                        buttonStyle={{ backgroundColor: '#FFF003', color: '1e72b0', fontWeight: 'bold' }}
                        color="1e72b0"
                        titleStyle={{
                            color: '#1e72b0',
                            fontWeight: 'bold'
                        }}
                        title="Confirmar resgate"
                        onPress={showModal}
                    />


                </ScrollView>
            </SafeAreaView>

            <Modal transparent={true} animationType='slide' visible={modalVisible}>{<Confirmacao />}</Modal>

            <Modal transparent={true} animationType='slide' visible={modalVisibleErro}>{<ErrorResgate dado={{ text, value }} />}</Modal>
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
    viewA: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        marginBottom: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea'
    },
    viewB: {
        color: '#000000',
        padding: 7,
        margin: 7,
        fontWeight: 'bold',
        fontSize: 17
    },
    textA: {
        color: '#7B7A7A',
        padding: 7,
        margin: 7,
        fontWeight: 'bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        // padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // height: 150,
        // width: 300,
    },
    button: {
        borderRadius: 0,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF003",
        margin: 100,
        top: 100,
        height: 50,
        fontWeight: 'bold'
    },
    buttonClose: {
        // backgroundColor: "#2196F3",
        // height: 300,
        margin: 80,
        width: 300,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
    },
    modalA: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    }

});
