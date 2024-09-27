interface IItem {
    id: number,
    name: string,
    quantity: number
}

class Item implements IItem {
    id: number
    name: string
    quantity: number
    constructor(id: number, name: string, quantity: number){
        this.id = id
        this.name = name
        this.quantity = quantity
    }
}