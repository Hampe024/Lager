import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";

import config from "../config/config.json";

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false; // True om order plockad
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
        console.log("HEJSAN")
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }
    
    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name + " - " + order.id}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            <Text>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}