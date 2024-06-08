const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
var cors = require('cors')
const multer = require('multer');
const app = express()
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
const corsOption = {
    credentials: true,
    origin: ['http://localhost:4200']
}
app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));
app.use(cors(corsOption));
//  upload file
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
})

// Set saved storage options:
const upload = multer({ storage: storage })

app.post("/api/UploadFile", upload.array("files"), (req, res) => {
    // Sets multer to intercept files named "files" on uploaded form data

    console.log(req.body); // Logs form body values
    console.log(req.files); // Logs any files
    res.json({ message: "File(s) uploaded successfully" });

});
routes(app)


app.listen(3000, () => {
    console.log(`Server is runing at http://localhost:3000`)
})