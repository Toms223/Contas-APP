import {useEffect, useState} from "react";
import axios from "axios";
import {Router} from "expo-router";

export const getItemsFromData = (dataList: any[]): Item[] => {
    const itemList: Item[] = []
    dataList.forEach((item: any) => {
        const existingItem = itemList.find((it: Item) => it.id === item.id)
        if (existingItem) {
            itemList.splice(itemList.indexOf(existingItem), 1)
            existingItem.quantity = existingItem.quantity + 1
            itemList.push(existingItem)
        } else {
            itemList.push(new Item(item.id, item.name, 1))
        }
    })
    return itemList
}

export const useCreateCart = (token:string, accountId: string) => {
    const [cart, setCart] = useState<ICart | null>(null)
    axios.post(GLOBAL.base_url + GLOBAL.carts_endpoint,
        { headers: { Authorization: `Bearer ${token}` }, accountId: accountId}
    ).then((response) => {
        const data = response.data
        const itemList = getItemsFromData(data.itemList)
        setCart(new Cart(data.id, itemList))
    })
    return cart
}

export const useGetCart = (token: string, cartId: string) => {
    const [cart, setCart] = useState<ICart | null>(null)
    axios.get(GLOBAL.base_url + GLOBAL.carts_endpoint + `/${cartId}`,
        { headers: { Authorization: `Bearer ${token}` }}
    ).then((response) => {
        const data = response.data
        const itemList = getItemsFromData(data.itemList)
        setCart(new Cart(data.id,itemList))
    })
    return cart
}

export const useDeleteCart = (token: string, cartId: string, router: Router) => {
    axios.delete(GLOBAL.base_url + GLOBAL.carts_endpoint + `/${cartId}`,
        {headers: {Authorization: `Bearer ${token}`}}
    ).then(_ => router.back())
}

export const useCartRemoveItem = (token: string, item: Item, cart: Cart) => {
    const [items, setItems] = useState<Item[]>([])
    useEffect(() => {
        axios.delete(GLOBAL.base_url + GLOBAL.carts_endpoint + `/${cart.id}` + GLOBAL.items_endpoint + `/${item.id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response)=> {
                setItems(getItemsFromData(response.data.data))
            })
    }, [item])
    cart.itemList = items
}

export const useCartAddItem = (token: string, item: Item, cart: Cart) => {
    const [items, setItems] = useState<Item[]>([])
    useEffect(() => {
        axios.put(GLOBAL.base_url + GLOBAL.carts_endpoint + `/${cart.id}` + GLOBAL.items_endpoint + `/${item.id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response)=> {
                setItems(getItemsFromData(response.data.data))
            })
    }, [item])
    cart.itemList = items
}

export const useCartRemoveItems = (token: string, items: Item[], cart: Cart) => {
    const [updatedItems, setUpdatedItems] = useState<Item[]>([])
    useEffect(() => {
        axios.delete(GLOBAL.base_url + GLOBAL.carts_endpoint + `/${cart.id}` + GLOBAL.items_endpoint,
            { headers: { Authorization: `Bearer ${token}` }, data: {items: items.map(item => item.id)}}
        )
            .then((response)=> {
                setUpdatedItems(getItemsFromData(response.data.data))
            })
    }, [items])
    cart.itemList = updatedItems
}

export const useCartAddItems = (token: string, items: Item[], cart: Cart) => {
    const [updatedItems, setUpdatedItems] = useState<Item[]>([])
    useEffect(() => {
        axios.put(GLOBAL.base_url + GLOBAL.carts_endpoint + `/${cart.id}` + GLOBAL.items_endpoint,
            { headers: { Authorization: `Bearer ${token}` }, items: items.map(item => item.id)}
        )
            .then((response)=> {
                setUpdatedItems(getItemsFromData(response.data.data))
            })
    }, [items])
    cart.itemList = updatedItems
}
