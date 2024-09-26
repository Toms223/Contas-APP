interface IBill {
    id: number,
    name: string,
    date: Date,
    continuous: boolean,
    period: Period,
    paid: boolean
}

class Bill implements IBill {
    continuous: boolean
    date: Date
    id: number
    name: string
    paid: boolean
    period: Period

    constructor(id: number, name: string, date: Date, continuous: boolean, period: Period, paid: boolean){
        this.id = id
        this.name = name
        this.date = date
        this.continuous = continuous
        this.period = period
        this.paid = paid
    }

    calculateNextDates = function(from: Date, to: Date, bill: Bill): Date[] {
        const dates: Date[] = []
        let currentDate = bill.date
        while(from.before(bill.date) && currentDate.before(to)){
            currentDate.add(bill.period)
            if(currentDate.before(to)){
                dates.push(currentDate)
            }
        }
        return dates
    }
}


