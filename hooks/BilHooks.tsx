import {useEffect, useState} from "react";
import axios from "axios";
import {Router} from "expo-router";



export const useGetBill = (token: string, billId: string) => {
    const [bill, setBill] = useState<Bill | null>(null);
    useEffect(() => {
        axios.get(GLOBAL.base_url + GLOBAL.bills_endpoint + `/${billId}`,
            { headers: { Authorization: `Bearer ${token}` } } )
            .then((response) => {
                const data = response.data
                setBill(new Bill(data.id, data.name, data.date, data.continuous, data.period, data.paid))
            })
    },[billId]);
    return bill
}

export const useCreateBill = (token: string, name:string, date:Date, continuous:string, period:Period, accountId:number) => {
    const [bill, setBill] = useState<Bill | null>(null);
    axios.post(GLOBAL.base_url + GLOBAL.bills_endpoint, { headers: { Authorization: `Bearer ${token}` },
        name: name,
        date: date.toISOString().split('T')[0],
        continuous: continuous,
        period: period.toString(),
        accountId: accountId,
    }).then((response) => {
        const data = response.data
        setBill(new Bill(data.id, data.name, new Date(data.date), data.continuous, new Period(data.period), data.paid))
    })
    return bill
}

export const useUpdateBill = (token: string, updatingBill: Bill) => {
    const [bill, setBill] = useState<IBill>(updatingBill);
    axios.put(GLOBAL.base_url + GLOBAL.bills_endpoint, { headers: { Authorization: `Bearer ${token}` },
        id: updatingBill.id,
        name: updatingBill.name,
        date: updatingBill.date.toISOString().split('T')[0],
        continuous: updatingBill.continuous,
        period: updatingBill.period.toString(),
        paid: updatingBill.paid
    }).then((response) => {
        const data = response.data
        setBill(new Bill(data.id, data.name, new Date(data.date), data.continuous, new Period(data.period), data.paid))
    })
    return bill
}

export const useDeleteBill = (token: string, billId: number, router: Router) => {
    axios.delete(GLOBAL.base_url + GLOBAL.bills_endpoint + `/${billId}`,
        {headers: {Authorization: `Bearer ${token}`}})
        .then(_ => {
            router.back()
        }).catch(console.error)
}

export const usePayState = (token: string, toPayBill: Bill, pay: boolean) => {
    const [bill, setBill] = useState<IBill>(toPayBill);
    useEffect(() => {
        const request = pay ? axios.put(GLOBAL.base_url + GLOBAL.bills_endpoint + `/${bill.id}/pay`,
                { headers: { Authorization: `Bearer ${token}` }})
        : axios.put(GLOBAL.base_url + GLOBAL.bills_endpoint + `/${bill.id}/unpay`,
                { headers: { Authorization: `Bearer ${token}` }})
        request.then((response) => {
            const data = response.data
            setBill(new Bill(data.id, data.name, new Date(data.date), data.continuous, new Period(data.period), data.paid))
        })
    }, [pay])
    return bill
}