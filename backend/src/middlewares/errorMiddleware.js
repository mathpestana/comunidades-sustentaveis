class ApiError{
  constructor(logger){
    this.logger=logger
    this.handle=this.handle.bind(this)
  }

  handle(err, req, res, next ) {
    this.logger.console.error(`Erro: ${err.message}`);
    this.logger.error(err.stack)
  
    const statuscode = err.statuscode || 500;
    
    const message = err.message || "Erro interno do servidor";

    const additionalInfo = process.env.NODE_ENV === 'development'
      ? { stack: err.stack }
      : {};
      res.status(statuscode).json({error:message,...additionalInfo})
  
  }
  
}

module.exports = ApiError