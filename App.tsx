import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from './assets/warehouse.jpg';
import Stock from './components/Stock.tsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        <Text style={{ color: 'black', fontSize: 42 }}>Lager-Appen</Text>
        <Image source={warehouse} style={styles.img} />
        <Stock />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3b7be',
  },
  base: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
  img: {
    width: 350,
    height: 240
  }
});