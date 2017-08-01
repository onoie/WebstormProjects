var http = require('http');
var PORT = 80;
var HOSTNAME = '127.0.0.1';
var USER = 'www-data';

var exec = require('child_process').exec
var cmd = 'cd /var/www/html && git pull origin master'; //git>コマンド設定

/*コマンド実行関数*/
function update() {
    return exec(cmd, {timeout: 90000},
        function(error, stdout, stderr) {
            console.log('stdout: '+(stdout||'none'));
            console.log('stderr: '+(stderr||'none'));
            if(error !== null) {
                console.log('exec error: '+error);
            }
        }
    )
};

http.createServer(function (req, res) {
    if(req.method == 'POST'){
        update();
    }else{
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    }
}).listen(PORT, HOSTNAME, function () {
    console.log('change user');
    process.setuid(USER);
});

console.log('Server running at http://' + HOSTNAME + ':' + PORT + '/');
