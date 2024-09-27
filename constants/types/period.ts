interface Date {
    before(date: Date): boolean
    add(period: Period): void
}

interface IPeriod {
    days: number,
    months: number,
    years: number
}

class Period implements IPeriod {
    days: number = 0
    months: number = 0
    years: number = 0

    constructor(period: string) {
        if(!period.includes("P")) {
            throw new Error("Invalid period format")
        }
        let periodArray = period.split("P")[1];

        if (period.includes("Y")) {
            this.years = parseInt(periodArray.split("Y")[0]);
        }
        if (period.includes("M")) {
            this.months = parseInt(periodArray.split("M")[0].split("Y")[1]);
        }
        if (period.includes("D")) {
            this.days = parseInt(periodArray.split("D")[0].split("M")[1]);
        }
    }

    toString(): string {
        let stringArray: string[] = []
        if(this.years !== 0){
            stringArray.push(`${this.years}Y`)
        }
        if(this.months !== 0){
            stringArray.push(`${this.months}M`)
        }
        if(this.days !== 0){
            stringArray.push(`${this.days}D`)
        }
        return stringArray.join("")
    }
}

Date.prototype.before = function(date: Date): boolean {
    return this.getTime() < date.getTime();
}

Date.prototype.add = function(period: Period): void {
    this.setDate(this.getDate() + period.days);
    this.setMonth(this.getMonth() + period.months);
    this.setFullYear(this.getFullYear() + period.years);
}