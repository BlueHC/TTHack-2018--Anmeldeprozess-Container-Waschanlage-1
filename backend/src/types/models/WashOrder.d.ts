export interface washOrder {
    name: string;
    Trailer: {
        type: string,
        identifyer: string,
        chambers: [
            {
                coveramount: string,
                coverposition: string,
                surface: string,
                walltype: string,
                lastcontent: string[],
            }
        ],
    }
}