import axios from "axios";
import {useEffect, useState} from "react";
import {getItemsFromData} from "@/hooks/CartHooks";

export const useRegisterAction = (username: string, email: string, password: string) => {
    const [account, setAccount] = useState<IAccount | null>(null)
    axios.post(GLOBAL.base_url + GLOBAL.accounts_endpoint + '/register', {
        username: username,
        email: email,
        password: password
    }).then((response) => {
        setAccount(new Account(response.data.id, response.data.username, response.data.email, response.data.token))
    })
    return account
}

export const useLoginAction = (email: string, password: string) => {
    const [account, setAccount] = useState<IAccount | null>(null)
    axios.post(GLOBAL.base_url + GLOBAL.accounts_endpoint + '/login', {
        email: email,
        password: password
    }).then((response) => {
        setAccount(new Account(response.data.id, response.data.username, response.data.email, response.data.token))
    })
    return account
}

export const useGetAccount = (id: number, token: string) => {
    const [account, setAccount] = useState<IAccount | null>(null)
    axios.get(GLOBAL.base_url + GLOBAL.accounts_endpoint + `/${id}`,{headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            setAccount(new Account(response.data.id, response.data.username, response.data.email, response.data.token))
        })
    return account
}

export const useGetAccountBills = (id: number, token: string, limit: number, skip: number) => {
    const [bills, setBills] = useState<IBill[]>([])
    useEffect(() => {
        axios.get(GLOBAL.base_url + GLOBAL.accounts_endpoint + `/${id}/bills`,
            { headers: { Authorization: `Bearer ${token}` }, params: { limit: limit, skip: skip } })
            .then((response) => {
                setBills(response.data.data.map((data: any) =>
                    new Bill(data.id, data.name, data.date, data.continuous, data.period, data.paid)))
            })
    }, [limit, skip]);
    return bills
}

export const useGetAccountCarts = (id: number, token: string, limit: number, skip: number) => {
    const [carts, setCarts] = useState<ICart[] | null>(null)
    useEffect(() => {
        axios.get(GLOBAL.base_url + GLOBAL.accounts_endpoint + `/${id}/carts`,
            { headers: { Authorization: `Bearer ${token}` }, params: { limit: limit, skip: skip } })
            .then((response) => {
                setCarts(response.data.data.map((data: any) =>
                    new Cart(data.id, getItemsFromData(data.itemList))))
            })
    }, [limit, skip]);
    return carts
}

export const useGetAccountItems = (id: number, token: string, limit: number, skip: number) => {
    const [items, setItems] = useState<IItem[] | null>(null)
    useEffect(() => {
        axios.get(GLOBAL.base_url + GLOBAL.accounts_endpoint + `/${id}/items`,
            { headers: { Authorization: `Bearer ${token}` }, params: { limit: limit, skip: skip } })
            .then((response) => {
                const itemList = getItemsFromData(response.data.data)
                setItems(itemList)
            })
    }, [limit, skip]);

    return items
}