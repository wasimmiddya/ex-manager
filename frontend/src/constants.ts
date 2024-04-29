import { nanoid } from "nanoid"


export const searchByOptions = ["EXP", "DATE", "STATUS"]
export const data = [
    {
        id: nanoid(),
        expenditure: "Travelling",
        subDate: "23/04/2024",
        amtClaimed: 124.91,
        amtApproved: 100.15,
        approvDate: "25/04/204",
        status: "Approved",
    },
    {
        id: nanoid(),
        expenditure: "Lunch",
        subDate: "12/02/2024",
        amtClaimed: 231.86,
        amtApproved: 230.00,
        approvDate: "15/02/204",
        status: "Approved",
    },
    {
        id: nanoid(),
        expenditure: "House Rent",
        subDate: "18/05/2024",
        amtClaimed: 1200.00,
        amtApproved: 0.00,
        approvDate: "",
        status: "Pending",
    },
    {
        id: nanoid(),
        expenditure: "Shaving",
        subDate: "27/05/2024",
        amtClaimed: 75.00,
        amtApproved: 0.00,
        approvDate: "",
        status: "Rejected",
    },
]