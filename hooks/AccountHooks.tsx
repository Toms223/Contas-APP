import axios from "axios";
import {useState} from "react";

export const useRegisterAction = async (username: string, email: string, password: string) => {
    const [account, setAccount] = useState<IAccount | null>(null)
    await axios.post(GLOBAL.base_url + GLOBAL.accounts_endpoint + '/register', {
        username: username,
        email: email,
        password: password
    }).then((response) => {
        setAccount(new Account(response.data.id, response.data.username, response.data.email, response.data.token))
    })
    return account
}

export const useLoginAction = async (email: string, password: string) => {
    const [account, setAccount] = useState<IAccount | null>(null)
    await axios.post(GLOBAL.base_url + GLOBAL.accounts_endpoint + '/login', {
        email: email,
        password: password
    }).then((response) => {
        setAccount(new Account(response.data.id, response.data.username, response.data.email, response.data.token))
    })
    return account
}

export const useGetAccount = async (id: number, token: string) => {
    const [account, setAccount] = useState<IAccount | null>(null)
    await axios.get(GLOBAL.base_url + GLOBAL.accounts_endpoint + `/${id}`,{headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            setAccount(new Account(response.data.id, response.data.username, response.data.email, response.data.token))
        })
    return account
}

export const useGetAccountBills = async (id: number, token: string, limit: number, skip: number) => {
    const [bills, setBills] = useState<IBill[] | null>(null)
    await axios.get(GLOBAL.base_url + GLOBAL.accounts_endpoint + `/${id}/bills`,
        { headers: { Authorization: `Bearer ${token}` }, params: { limit: limit, skip: skip } })
        .then((response) => {
            setBills(response.data.data.map((data: any) =>
                new Bill(data.id, data.name, data.date, data.continuous, data.period, data.paid)))
        })
    return bills
}

export const useGetAccountCarts = async (id: number, token: string, limit: number, skip: number) => {
    const [carts, setCarts] = useState<ICart[] | null>(null)
    await axios.get(GLOBAL.base_url + GLOBAL.accounts_endpoint + `/${id}/carts`,
        { headers: { Authorization: `Bearer ${token}` }, params: { limit: limit, skip: skip } })
        .then((response) => {
            setCarts(response.data.data.map((data: any) =>
                new Cart(data.id, data.itemList.map((item: any) => new Item(item.id, item.name)))))
        })
    return carts
}

export const useGetAccountItems = async (id: number, token: string, limit: number, skip: number) => {
    const [items, setItems] = useState<IItem[] | null>(null)
    await axios.get(GLOBAL.base_url + GLOBAL.accounts_endpoint + `/${id}/items`,
        { headers: { Authorization: `Bearer ${token}` }, params: { limit: limit, skip: skip } })
        .then((response) => {
            setItems(response.data.data.map((data: any) =>
                new Item(data.id, data.name)))
        })
    return items
}