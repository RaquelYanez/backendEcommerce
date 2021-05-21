const notFound = (req,res,next) =>{
    const error = new Error(`No hay resultados para la URL: ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err,res) =>{
    const status = res.statusCode === 200 ? 500 :res.statusCode
    res.status(status)
    res.json({
        msg: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports= {notFound,errorHandler}