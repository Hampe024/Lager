import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";
import { useState, useEffect } from "react";
import { Base, Typography } from '../styles';
import productModel from "../models/products";

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    let pickable = true;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    const orderItemsList = order.order_items.map((item, index) => {
        if (item.stock < item.amount) {
            pickable = false;
            return <Text
                key={index}
                style={Typography.bold}
                >
                    {item.name} - {item.location} - {item.amount}st OBS endast {item.stock} i lager
            </Text>;
        }
        return <Text
                key={index}
                >
                    {item.name} - {item.location} - {item.amount}st
            </Text>;
    });

    if (pickable) {
        return (
            <View>
                <Text>Order id: {order.id}</Text>

                <Text>Namn: {order.name}</Text>
                <Text>Address: {order.address}</Text>
                <Text>Stad: {order.city}, {order.zip}</Text>

                <Text></Text><Text></Text>
                <Text style={Typography.header3}>Produkter:</Text>
                <Text style={Typography.bold}>produkt - hylla - antal</Text>
                {orderItemsList}

                <Text></Text><Text></Text>
                <Button title="Plocka order" onPress={pick} />
            </View>
        )
    }

    return (
        <View>
            <Text>Order id: {order.id}</Text>

            <Text>Namn: {order.name}</Text>
            <Text>Address: {order.address}</Text>
            <Text>Stad: {order.city}, {order.zip}</Text>

            <Text></Text><Text></Text>
            <Text style={Typography.header1}>Produkter:</Text>
            <Text style={Typography.normal}>produkt - hylla - antal</Text>
            {orderItemsList}

            <Text></Text><Text></Text>
            <Text style={Typography.normal}>Det finns inte tillräkligt av en eller fler artiklar</Text>
        </View>
    )
};