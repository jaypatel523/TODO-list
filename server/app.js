require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/main');
const connectDB = require('./db/connect');
const cors = require('cors');
var cookieParser = require('cookie-parser')
const path = require('path');

// look for the requested which has content type json 

app.use(cors());
app.use(express.json());
app.use(cookieParser())
// app.use(express.static('./client'));
// app.get('/api/v1', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './client/index.html'));
// })


// app.get('/api/v1', (req, res) => {
//     // console.log('Cookies: ', req.cookies)

//     // Cookies that have been signed
//     // console.log('Signed Cookies: ', req.signedCookies)
//     // res.sendFile(path.resolve(__dirname, './client'));
//     res.send("Home page");
// })
app.use('/api/v1', routes);





const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => console.log(`server is running...`));
    } catch (error) {
        console.log(error);
    }
}
start();