const Log = require('./log.schema');

module.exports.create = async (data) => {
    return Log.create(data);
}

module.exports.find = async (query) => {
    const q = {};
    if (query.commessa) {
        q.commessa = query.commessa;
    }
    if (query.stato) {
        q.stato = query.stato;
    }
    if (query.from || query.to) {
        q.data = {};
    }
    if (query.from) {
        q.data.$gte = query.from;
    }
    if (query.to) {
        q.data.$lte = query.to;
    }
    return Log.find(q).sort({data: -1});
}

module.exports.lastLog = async(from, to) => {
    const q = {
        data: {
            $gte: from,
            $lte: to
        }
    };

    return Log.findOne(q).sort({data: -1});
}

module.exports.getCommessa = async(codice) => {
    return Log.findOne({commessa: codice}).sort({data: -1});
}

module.exports.getCodiciCommessa = async() => {
    return Log.find().distinct('commessa');
}

module.exports.existsByCode = async(codice) => {
    // return Log.findOne({commessa: codice})
    //     .then(record => {
    //         return !!record;
    //     });

    const record = await Log.findOne({commessa: codice})
    return !!record;
}