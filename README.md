# Ex-Manager
An employee reimbursement management system for tracking the employees claims, request, bills etc.

### Video Demo
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/VZ1fmhOawfU/0.jpg)](https://www.youtube.com/watch?v=VZ1fmhOawfU)

## Project Set-Up
* Fork the project to your repository
* Clone the repository to your local machine by using the following git command
```bash
git clone https://github.com/wasimmiddya/dns-manager.git
```
* You will see two folders or directories - ```frontend``` and ```backend```

### Frontend Set-Up<hr>
* Navigate to `frontend` directory and install the dependencies
```sh
cd frontend 
```
* This project uses `yarn` package manager with react `Vite` bundlers, so it is recomended to use `yarn`.
```sh
yarn
```
*  You can also use `npm install` as well
```sh
npm install
```
* After installing pakages you can run the application by using `yarn dev`
```sh
yarn dev
```
* Hurray! Your application is now running on `http://localhost:5173` port. Now it is time to set-up backend.


### Backend Set-Up<hr/>
* Navigate to `backend` directory
* Install the packages using `yarn` or `npm install` command
```sh
yarn
```
* Take a look at `.sample.env` file in the project folder
* Create your `.env` file and fill all the credentials as mentioned in the `.sample.env` file
```sh
touch .env
```
* This application uses a third party service - `cloudinary` for uploading and fetching images 
* Make sure you have cloudinary account. If not go to the offcial website of cloudinary and create an account https://cloudinary.com
* Fill all the credentials in `.env` file and you are good to go
* Run the server using `yarn dev` or `npm run dev`(if you are using npm package manger)
```sh
yarn dev
```
* Hurray! Your server is now running on http://localhost:8000 or whatever port you have set in `.env` file
  

# Requirements and Specifications
▧ **Ex-Manager** Manager solves problem of tracking updaates on employees rembursement claims. This application provides the fesilities to the employees to make expense claims and can see updates by manager(or ADMIN). On the other hand manager who sign-in as an ADMIN has the permission to approve and reject the request claim. Both parties can see the updates in an immediate manner. This reduces time tracking the updates and hectic of paper work.

➡️ **Project Objects :** The ultimate objective of this project is to perform CRUD(Create, Read, Update and Delete) operations and implementing authentication and authorization of users.


➡️ **Tools and Technologies :** There are many tools and technologies used in this project for implementing, testing and debugging purpose.

<br/>

➡️ **Tools ::**<hr/>
1. Visual Studio Code Editor(VS Code)
2. Web Browser(basically Google Chrome to see the output and debugging code)
3. Postman(for API testing)
4. Prisma Studio(to view the tables in the database)
5. SQLyog(alternative to Prisma Studio)

<br/>

➡️ **Technologies :**<hr/>
1. **NodeJS :** A runtime envirenment that provides or support bunch of libraries and packages for executing javascript program.
2. **Express :** A framework build on top of node-js, that provides functionalities to create APIs, routes etc.
3. **Typescript :** A development tool for writing javascript code in a structured format. Sometimes it is called the superset of javascript.
4. **React :** A frontend library for developing UI in a faster way.
5. **Prisma :** Prisma is a ORM(Object Relational Mapping) tool that allows you to write database schema, query and relations in Object Oriented Programming style. It maps your program to the database.
6. **MySQL :** A popular relational database.

<br/>
<p style="background-color: rgba(255,80,100, 0.1); padding: 5px 12px; border-radius: 8px; border: 1px solid; width: 90%; margin: 0 auto;">
    <b>Note: </b> The above mentioned are the core technologies, there are other third party dependencies and libraries used in this project as well.
</p> 

## Entity Relationship Diagram : 
<image src="ERD.png"/>
➡️ An Entity-Relationship (ER) Diagram is a visual representation of data organization in a database system. It uses rectangles to represent entities (important objects or concepts), ovals for attributes (descriptive properties of entities), and diamonds to depict the relationships between entities. ER diagrams are crucial for database design, acting like a blueprint that maps out how data connects and flows within the system. This helps ensure a logical structure, reduces redundancy, and simplifies the process of managing information.

## Data Flow Diagram : 
<image src="DFD.png"/>
➡️ A Data Flow Diagram (DFD) is a graphical tool used to visualize how data moves through a system or process. It resembles a flowchart, but instead of focusing on the sequence of steps, it highlights the flow of information. DFDs use symbols like rectangles for processes, squares for external entities (data sources and destinations), arrows to represent data flow, and lines with open circles for data stores. These diagrams are helpful for understanding how a system works, identifying bottlenecks, and improving data flow efficiency. They can be created at different levels of detail, providing a high-level overview or diving deeper into specific processes within the system.

## Conclusion : 
➡️ Ex-Manager is an Expense Remburesment System for tracking employees expense claims and approval and rejection of requests by the manager or admin.
