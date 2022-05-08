import { useEffect, useState } from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import config from "../config/config.json";
import warehouse from '../assets/warehouse.jpg';
import { Base, Typography } from '../styles';
import productModel from "../models/products";





function Stock({products, setProducts}) {
    
    useEffect(async () => {
      setProducts(await productModel.getProducts());
    }, []);

    const list = products.map((product, index) => <Text key={index}>{ product.name } - {product.id} - { product.stock } {"\n"}</Text>);

    return (
        <Text style={Base.stockStyle}>
            {"Produkt - id - Saldo \n\n"}
            {list}
        </Text>
    );
  }


export default function Home({products, setProducts}) {
  return (
      <ScrollView style={Base.base}>
          <Text style={Base.header}>Lager-Appen</Text>
          <Image source={warehouse} style={Base.lagerImg} />
          <Text style={Base.title}>Lagerförteckning</Text>
          <Stock products={products} setProducts={setProducts} />
      </ScrollView>
  );
}