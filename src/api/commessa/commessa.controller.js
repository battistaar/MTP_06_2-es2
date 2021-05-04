const logModel = require('../log/log.model');

module.exports.getLastState = async(req, res, next) => {
    try {
        /*const logs = await logModel.find({commessa: req.params.codice});
        if (logs.length) {
            res.json(logs[0]);
        } else {
            next(new Error('Not Found'));
        }*/
        const lastLog = await logModel.getCommessa(req.params.codice);
        res.json(lastLog);
    }catch(err) {
        next(err);
    }
}

module.exports.list = async(req, res, next) => {
    try {
        const codici = await logModel.getCodiciCommessa();
        const logPromises = codici.map(codice => {
            return logModel.getCommessa(codice)
                .then(log => {
                    return {
                        commessa: log.commessa,
                        cliente: log.cliente,
                        prodotto: log.prodotto,
                        quantitaPrevista: log.quantitaPrevista,
                        stato: log.stato
                    };
                });
        });

        const logs = await Promise.all(logPromises);
 
        res.json(logs);
    }catch(err) {
        next(err);
    }
}

module.exports.getLogs = async(req, res, next) => {
    try {
        const logs = await logModel.find({commessa: req.params.codice});
        res.json(logs);
    } catch(err) {
        next(err);
    }
}

module.exports.checkCodice = async(req, res, next) => {
    try {
        const exists = await logModel.existsByCode(req.params.codice);
        if (!exists) {
            throw new Error('Not Found');
        }
        next();
    } catch(err) {
        next(err);
    }
}