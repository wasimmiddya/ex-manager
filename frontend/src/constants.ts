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


export const searchReportOption = ["ENAME", "EID", "STATUS"]
export const reports = [
    {
        id: nanoid(),
        emp_name: "Zeesan Tarafdar",
        emp_id: "zeesan3@gmail.com",
        sub_date: "06/11/2024",
        amt_claimed: "49.00",
        status: "Pending"
    },
    {
        id: nanoid(),
        emp_name: "Mr.Sohan Shaw",
        emp_id: "mrshaw69@gmail.com",
        sub_date: "07/24/2024",
        amt_claimed: "25.00",
        status: "Approved"
    },
    {
        id: nanoid(),
        emp_name: "Koustav Manna",
        emp_id: "manna44@gmail.com",
        sub_date: "02/30/2024",
        amt_claimed: "100.00",
        status: "Pending"
    },
    {
        id: nanoid(),
        emp_name: "Pralay Giri",
        emp_id: "giri153@gmail.com",
        sub_date: "08/06/2024",
        amt_claimed: "90.00",
        status: "Pending"
    },
    {
        id: nanoid(),
        emp_name: "Wasim Raja",
        emp_id: "middya34@gmail.com",
        sub_date: "04/12/2024",
        amt_claimed: "45.00",
        status: "Pending"
    },
]

export const countryCodeNo = [
    { country: "IND", code: "+91" },
    { country: "BNGD", code: "+880" },
    { country: "AUS", code: "+61" },
    { country: "BLG", code: "+32" },
    { country: "CHN", code: "+86" },
    { country: "FRN", code: "+33" },
    { country: "GRM", code: "+49" },
    { country: "UK", code: "+44" },
    { country: "USA", code: "+1" },
    { country: "JPN", code: "+81" },
  ];