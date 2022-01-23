import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ListaInvestimento from './src/pages/ListaInvestimento';
import ResgateInvestimento from './src/pages/ResgateInvestimento'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
function HomeScreen({ route, navigation }) {
  return (
    <ListaInvestimento navigation={navigation} route={route} />
  );
}

function DetailsScreen(navigation, route) {
  return (
    <ResgateInvestimento navigation={navigation} route={route}/>
  );
}
export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app!</Text> */}
    //   <ListaInvestimento/>
    //   <StatusBar style="auto" />
    // </View>


    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="ResgateInvestimento" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
