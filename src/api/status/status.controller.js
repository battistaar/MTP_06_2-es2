const logModel = require('../log/log.model');
const moment = require('moment');

module.exports.getStatus = async(req, res, next) => {
    try {
        const twoHoursAgo = moment().subtract(2, 'h').toDate();
        const query = {
            from: twoHoursAgo,
            to: new Date()
        };
        const logs = await logModel.find(query);
        if (logs.length) {
            res.json(logs[0]);
        } else {
            res.json({
                stato: 'idle'
            });
        }
        /*const twoHoursAgo = moment().subtract(2, 'h').toDate();
        const last = await logModel.lastLog(twoHoursAgo, new Date());
        if (last) {
            res.json(last);
        } else {
            res.json({
                stato: 'idle'
            });
        }*/
    }catch(err) {
        next(err);
    }
}