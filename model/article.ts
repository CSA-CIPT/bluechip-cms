import type {AssetData} from "~/model/image/image";

export class Article{
    constructor(
        public id: number,
        public title: string,
        public type: string,
        public content: string,
        public status: string,
        public mainImage: string,
        public startDate: string,
        public endDate: string,
        public relatedStocks: string[],
        public images: AssetData[]
    ) {
    }
}