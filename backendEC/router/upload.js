import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req,file,cb) {  // donde va a ir el archivo
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {  // como se va a llamar el archivo
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage}) // genera el middleware de multer

/* POST - req para agregar producto */
router.post('/',upload.single('foto'), (req,res, next) => {
    const file = req.file

    if(!file) {
        const error = new Error('Error subiendo el archivo')
        error.httpStatuscode = 400
        return next(error)
    }

    res.json({nombre : file.filename }) // si no hay error devuelve un objeto con el nombre de la foto
})


export default router 