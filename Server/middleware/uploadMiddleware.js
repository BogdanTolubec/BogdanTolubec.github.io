const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, 'uploads/')
    },
    filename(req, file, callback){
        callback(null, new Date().toISOString + "_" + file.originalname)
    }
})

const types = ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/pdf"]

const fileTypeCheck = (req, file, callback) => {
    if(types.includes(file.mimetype)){
        callback(null, true)
    }
    else{
        callback(null, false)
    }
}

module.exports = multer({storage, fileTypeCheck})