const errorHandler = (err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'Error interno del servidor' : err.message;

    res.status(statusCode).json({
        error: message,
        timestamp: new Date().toISOString()
    });
};

const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    errorHandler,
    notFoundHandler
};