# gamehub-api
mirip kayak steam tapi lebih simple

# How to run backend
- run `cd backend` in cmd
- run `npm install` in cmd
- run `npm run dev` in cmd
- open on [localhost](https://localhost:3000)
- test endpoint on postman through [this link](https://www.postman.com/science-geoscientist-54377924/workspace/gamehub-web-app/collection/24096909-d1337b7b-0e1b-422e-b4fd-207d34c10a40?action=share&creator=24096909) 

# How to run frontend
- run `cd frontend` in cmd
- run `npm install` in cmd
- run `npm run dev` in cmd
- open on [localhost](https://localhost:4000)

# How to how to Create, Update and Delete games
- make sure you can run backend by follow instruction above
- run `cd backend` in cmd
- run `npm run admin_init` in cmd
- open this project postman collection through [this link](https://www.postman.com/science-geoscientist-54377924/workspace/gamehub-web-app/collection/24096909-d1337b7b-0e1b-422e-b4fd-207d34c10a40?action=share&creator=24096909)
- open login admin routes, Gamehub-backend -> Admin Routes -> LoginAdmin, click Send. you will get temporary token as response, token will expired after around 1 hours. copy this token to somewhere save
- select any of CRUD method. choose Authorization, then enter your token there.
- edit form in Body with raw selected. once done, just send that method

# Used Stack
- PostgreSQL
- NodeJS
- Express.js
- Prisma.js
- Bcrypt.js
- Json Web Token (JWT)
- React

# Database Tables
- Game : store game that have been added by admin
- Review : store all game review, 1 user cannot make more than one review in one game
- User : store user data, including admin.
- UserGame : store ownership of games, contain user id and game id.
- wishlist : store user wishlist, contain user id and game id.

