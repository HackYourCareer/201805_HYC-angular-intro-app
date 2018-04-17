export class WeatherItem {
    constructor(public date: Date, public cityName: string, public description: string, public temperature: number,
                public icon: string, public pressure: number, public humidity: number) {}
}
