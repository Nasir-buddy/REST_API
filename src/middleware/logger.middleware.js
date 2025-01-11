import fs from 'fs';

const fsPromise = fs.promises;
async function log(logData) {
    try {
        const logData = new Data().toString() + ". Log Data: " + logData;
        fs.promises.writeFile('log.txt', logData);
    } catch (error) {
        console.log(error);
    }
}

const loggerMiddleware = async (req, res, next) => {
    //1. Log request body.
    await log(req.body);
    next();
}
export default loggerMiddleware;