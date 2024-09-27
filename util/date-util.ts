export class DateUtil{
    //'YYYY-MM-DD'
    static readonly getTodayDate = (): string => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    static readonly getTodayDateEpochSecond = (): string => {
        return Math.floor(Date.now() / 1000)
    }

    //'YYYY-MM-DD'
    static readonly unixToDateTime(unixTimestamp: number): string {
        if(unixTimestamp == 0){
            return this.getTodayDate();
        }

        const date = new Date(unixTimestamp * 1000);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    static readonly dateTimeToUnix(dateTime: string): number {
        const date = new Date(dateTime);
        return Math.floor(date.getTime() / 1000);
    }

    static readonly unixToDate(unixTimestamp: number): string {
        const date = new Date(unixTimestamp * 1000);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    static readonly unixToTime(unixTimestamp: number): string {
        const date = new Date(unixTimestamp * 1000);

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    }

}