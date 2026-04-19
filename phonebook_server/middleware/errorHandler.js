const errorHandler = (error, req, res, next) => {
    console.log(error.name);

    if (error.name === 'CastError'){
        console.log('Go to here')
        return res.status(400).send({ error: 'malformatted id' })
    }
    
    next(error);
}

export default errorHandler