var Lab = require('lab');
var Code = require('code');
var Path = require('path');
var Config = require('../../../config');
var Hapi = require('hapi');
var HomePlugin = require('../../../server/web/home/index');


var lab = exports.lab = Lab.script();
var request, server;


lab.beforeEach(function (done) {

    var plugins = [require('vision'), HomePlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, function (err) {

        if (err) {
            return done(err);
        }

        done();
    });
    server.views({
        engines: { jsx: require('hapi-react-views') },
        path: './server/web',
        relativeTo: Path.join(__dirname, '..', '..', '..')
    });
});


lab.experiment('Home Page View', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'GET',
            url: '/'
        };

        done();
    });



    lab.test('home page renders properly', function (done) {

        server.inject(request, function (response) {

            Code.expect(response.result).to.match(/Success/i);
            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });
});
