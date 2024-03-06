export class CustomDdateRanges {
    static readonly dateRnage = {

        Today: [new Date(), new Date()],
        Yesterday: [
            new Date(new Date().setDate(new Date().getDate() - 1)),
            new Date(new Date().setDate(new Date().getDate() - 1))
        ],
        'Last 7 Days': [
            new Date(new Date().setDate(new Date().getDate() - 6)),
            new Date(new Date())
        ],
        'Last 30 Days': [
            new Date(new Date().setDate(new Date().getDate() - 29)),
            new Date(new Date())
        ],
        'This Month': [
            new Date(new Date().setDate(1)),
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        ],
        'Last Month': [
            new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
            new Date(new Date().getFullYear(), new Date().getMonth(), 0)
        ],
        'Clear': [
            undefined,
            undefined
        ]
    }
}