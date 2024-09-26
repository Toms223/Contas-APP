interface IItem {
    id: number,
    name: string,
}

class Item implements IItem {
    id: number
    name: string

    constructor(id: number, name: string){
        this.id = id
        this.name = name
    }
}