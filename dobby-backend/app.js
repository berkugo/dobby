const restify = require("restify");
const mysql = require("mysql");

const server = restify.createServer({
    name: 'dobby-backend',
    version: '1.0.0'
});
const connection = mysql.createConnection({
    host: '3.67.138.172',
    user: 'dobbyuser',
    password: 'chr123321',
    database: 'dobby'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(
    function crossOrigin(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);
server.get('/getdata', function (req, res, next) {
    connection.query('SELECT `Barkod`, `Kodu`, `Ad`, `BrutTutar`, `ToplamBrutTutar`, `IskontoTutar`, `IskontoOran`, `KDVHaricNetTutar`, `KdvYuzde`, `KDVDahilNetTutar` FROM products', (error, results, fields) => {
        if (error)
            throw error;
        res.json(results);
    });
    return next();
});

function connectionCallback(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    } else {
        console.log("Bağlantı sağlandı.")
    }
}


server.listen(3000, function () {
    connection.connect(connectionCallback);
    console.log('%s listening at %s', server.name, server.url);
});