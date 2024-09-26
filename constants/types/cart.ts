interface ICart {
    id: number,
    itemList: Item[]
}

class Cart implements ICart {
    id: number
    itemList: Item[]

    constructor(id: number, itemList: Item[]){
        this.id = id
        this.itemList = itemList
    }
}