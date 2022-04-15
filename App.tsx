import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './components/Stock.tsx';
import Pick from "./components/Pick.tsx";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "list",
}

const [products, setProducts] = useState([]);


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>

        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}>
            <Tab.Screen name="Lager" component={Stock}>
              {() => <Stock products={products} setProducts={setProducts} />}
            </Tab.Screen>
            <Tab.Screen name="Plock" component={Pick} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  base: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
});