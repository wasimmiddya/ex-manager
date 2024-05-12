# Ex-Manager
An employee reimbursement management system for tracking the employees claims, request, bills etc.

### Video Demo


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
  

## Requirements and Specifications


