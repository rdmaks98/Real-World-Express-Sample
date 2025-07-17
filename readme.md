## Task 
-> This is a Node.js + Express + MongoDB (Mongoose) based backend for managing users, roles, access modules, and authentication.

## Version Details
Node - v20.18.1
Express - 8.16.4
mongoose - 5.1.0

## Installtion
git clone https://github.com/rdmaks98/Real-World-Express-Sample.git
cd project-folder
npm install

## Run Project
npm start


## Api Modules

### Auth
| Method | Endpoint        
| POST   | /api/auth/signup
| POST   | /api/auth/signin

### Role
| Method | Endpoint        
| GET    | /api/roles?rolename=g      
| POST   | /api/roles     
| PUT    | /api/roles/:id 
| DELETE | /api/roles/:id
| GET    | /api/roles/:id

### User
| Method | Endpoint       
| GET    | /api/user?username=a 
| PATCH  | /api/user/add-access/:id
| PATCH  | /api/user/remove-access/:id
| GET    | /api/user/check-access/:modulename 
| PUT    | /api/users/update-all-user 
| PUT    | /api/users/bulk-update


## Run Project
npm start
