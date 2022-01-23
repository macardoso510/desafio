import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
// import { TextInput } from 'react-native-paper';
import MaskInput, { Masks } from 'react-native-mask-input';
import { Button } from 'react-native-elements/dist/buttons/Button';
export default function ResgateInvestimento({ route, navigation }) {
    const [value, setValue] = useState(navigation.route.params.dado);
    const [text, setText] = useState([]);
    const [valorSoma, setValorSoma] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    // const { itemId, otherParam } = route.params;
    useEffect(() => {
    }, []);


    function modalErro() {
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    }




    function valorResgate(texto, dado, x) {
        let formatar = texto.replace('R$', '').replace('.', '').replace(' ', '');
        let formatarMoeda = formatar.replace(',', '.')
        let soma = 0;
        const array = [...text];
        array[x] = {
            ...dado,
            valorResgatar: formatarMoeda,
            erro: formatarMoeda > (dado.percentual * value.saldoTotal / 100) ? true : false
        }
        setText(array)
        // console.log(array)
        // for (let y in array[x]) {
        //     if (array[y].valorResgatar){
        //     soma += parseFloat(array[y].valorResgatar);
        // }
        for (let x in array) {

            if (array[x]) {
                soma += parseFloat(array[x].valorResgatar);
                console.log("s", soma)
                setValorSoma(soma)
            } else {
                console.log("e", soma)
                // soma += parseFloat(array[x].valorResgatar);
                setValorSoma(soma)

            }

        }
        // }
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
                                {/* <MaskInput
                                    style={{
                                        borderRadius: 0,
                                        backgroundColor: '#fff',
                                        color: '#1e72b0',
                                        height: 50
                                    }}
                                    label="Valor a Resgatar"
                                    value={text}
                                    onChangeText={text => setText(text)}
                                    keyboardType='numeric'
                                    onBlur={() => console.log("focus lost") }
                                /> */}

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
                        onPress={() => setModalVisible(true)}
                    // onPress={storingDomain}
                    />


                </ScrollView>
            </SafeAreaView>
            {/* Modal pra sucesso */}
            {/* <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been clo?sed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        // marginTop: 22,
                        
                        flex: 1,
                    }} >
                        <View style={styles.modalView}>
                            <View >
                                <Text style={{top: 50, fontSize: 16,  fontWeight: 'bold' }} >RESGATE EFETUADO!</Text>
                            </View>
                                <Text style={{margin:7, padding: 7, top: 50, fontSize: 13, fontWeight: '100'} }>O valor solicitado estará em sua conta em até 5 dias úteis</Text>
                            <Pressable
                                style={styles.buttonOpen}
                                onPress={() => setModalVisible(!modalVisible)}
                                title='aaaa'
                            >
                                <Text >Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View> */}



            {/* Modal pra erro */}
            <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been clo?sed.");
                        console.log(text)
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        // marginTop: 22,
                        
                        flex: 1,
                    }} >
                        <View style={styles.modalView}>
                            <View >
                                <Text style={{top: 50, fontSize: 16,  fontWeight: 'bold' }} >DADOS INVÁLIDOS!</Text>
                            </View>
                                <Text style={{margin:7, padding: 7, top: 50, fontSize: 13, fontWeight: '100'} }>Você preencheu um ou mais campos com valor acima do permitido</Text>
                            <Pressable
                                style={styles.buttonOpen}
                                onPress={() =>  console.log(text , value)}
                                title='aaaa'
                            >
                                <Text >Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
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
        // marginBottom: 213,
        // height: 120,
        // width: 120,
        // textAlign: "center"
    },
    modalA: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    }

});
