import { useEffect, useState } from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import config from "../config/config.json";
import warehouse from '../assets/warehouse.jpg';




function StockList() {
  

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


export default function Stock({products, setProducts}) {
  return (
      <ScrollView style={styles.base}>
          <Text style={styles.header}>Lager-Appen</Text>
          <Image source={warehouse} style={styles.img} />
          <Text style={styles.title}>Lagerförteckning</Text>
          <Stock products={products} setProducts={setProducts} />
          <StockList/>
      </ScrollView>
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
    },
    img: {
      width: 350,
      height: 240
    }
};

