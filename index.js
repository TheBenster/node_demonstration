const path = require('path');
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    let filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? 'index.html' : req.url
    )
    let extName = path.extname(filePath);

    let contentType = 'text/html';

    switch(extName){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code === 'ENONT'){
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type' : contentType });
                    res.end(content, 'utf8');
                })
            } else {
                res.writeHead(500);
                res.end(`server error: ${err.code}`)
            }
        } else {
            res.writeHead(200, { 'Content-Type' : contentType} );
            res.end(content, 'utf8')
        }
    })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => { console.log(`server running on port ${PORT}.`)})