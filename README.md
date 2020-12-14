## [React Single File Upload Tutorial with Node, Express and Multer](https://www.positronx.io/react-file-upload-tutorial-with-node-express-and-multer/)

Upload a single file in React app.

---
### Starting Project

In the project directory run:

### `yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `nodemon  ./src/backend/server.js`
Open [http://localhost:4000/api](http://localhost:4000/api) to verify API is running.

---
### Curl commands for testing API

Get list of images from database:

### `curl -s http://localhost:4000/api | jq`

Upload an image:

### `curl -F 'profileImg=@avatar.jpg' http://localhost:4000/api/user-profile`
