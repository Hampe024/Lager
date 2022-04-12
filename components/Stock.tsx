import { useEffect, useState } from 'react';
import { Stylesheet, Text, View } from 'react-native';
import config from "../config/config.json";

function StockList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
    }, []);
    
    const list = products.map((product, index) => <Text key={index}>{ product.name } - { product.stock } {"\n"}</Text>);

    return (
        <Text style={styles.stockStyle}>
            {"Produkt - Saldo \n\n"}
            {list}
        </Text>
    );
  }

  
  export default function Stock() {
  return (
      <View>
      <Text style={styles.title}>Lagerförteckning</Text>
      <StockList/>
    </View>
  );
}

const styles = {
    stockStyle: {
        backgroundColor: '#d9dbde',
        fontSize: 23,
        width: 200,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 6,
    },
    title: {
        color: '#333',
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20,
    }
};