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

# How to CRUD games
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
- Game : tempat menyimpan semua game yang telah ditambahkan oleh admin
- Review : tempat menyimpan semua review game, 1 user tidak bisa bikin banyak review di 1 game
- User : tempat menyimpan data user, termasuk admin.

