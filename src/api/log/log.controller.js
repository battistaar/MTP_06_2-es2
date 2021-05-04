const logModel = require('./log.model');

module.exports.create = async (req, res, next) => {
    try {
        const created = await logModel.create(req.body);
        res.status(201);
        res.json(created);
    }catch(err) {
        next(err);
    }
}

module.exports.find = async (req, res, next) => {
    try {
        const list = await logModel.find(req.query);
        res.json(list);
    }catch(err) {
        next(err);
    }
}