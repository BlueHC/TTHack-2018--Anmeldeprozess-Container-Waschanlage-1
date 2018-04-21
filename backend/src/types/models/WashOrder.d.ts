export interface washOrder {
    name: string,
    company: string,
    customerNumber: string,
    Trailer: {
        type: string,
        identifier: string,
        cmr: Array<number>,
        chambers: [
            {
                coveramount: string,
                coverposition: string,
                surface: string,
                walltype: string,
                lastcontent: [
                    {
                        UnNumber: string,
                        productName: string
                    }
                    ],
                lastload: [
                    {
                        place: string,
                        date: string
                    }
                    ],
                weatherSinceLastLoad: [{
                   temp: string,
                   humidity: string,
                }],
                loadHistory: [
                    {
                        UNNumber: string,
                        productName: string
                    }
                    ],
                restContent: boolean,
                cleaning: {
                    special: Array<string>,
                    airvent: boolean,
                    airventAdapter: {
                        clean: Boolean,
                        amount: number
                    },
                    pump: boolean,
                    seals: {
                        clean: boolean,
                        amount: number
                    }
                }
            }
            ],
    }
}