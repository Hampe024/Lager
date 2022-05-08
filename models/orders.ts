import config from "../config/config.json";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
        console.log(order)
        const statusId: number = 200;
        await orders.updateOrder(order, statusId);

        await Promise.all(
            order.order_items.map(async (order_item: Partial<Order>) => {
                let updatedProduct = {
                    id: order_item.product_id,
                    name: order_item.name,
                    stock: order_item.stock - order_item.amount,
                    api_key: config.api_key,
                };
                await orders.updateProduct(updatedProduct);
            })
        );
    },

    updateProduct: async function updateProduct(product: any) {
        const updateProduct = {
            ...product,
            stock: product.stock,
            api_key: config.api_key,
        };
        try {
            await fetch(`${config.base_url}/products?`, {
                body: JSON.stringify(updateProduct),
                headers: {
                    "content-type": "application/json",
                },
                method: "PUT",
            });
        } catch (error) {
            console.log("Could not update product: ", error);
        }
    },

    updateOrder: async function updateOrder(order: Partial<Order>, statusId: number) {
        let updateOrderID = {
            id: order.id,
            name: order.name,
            status_id: statusId,
            api_key: config.api_key,
        };
        try {
            await fetch(`${config.base_url}/orders`, {
                body: JSON.stringify(updateOrderID),
                headers: {
                    "content-type": "application/json",
                },
                method: "PUT",
            });
        } catch (error) {
            console.log("Could not update order: ", error);
        }
    },
};

export default orders;