const fs = require('fs');
const express = require('express');
const path = require('path');
const { log } = require('console');

const app = express();
app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render('index', {files});
    });
});

app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, filedata) => {
        res.render(
            'show',
            {filename: req.params.filename,
            filedata}
        );
        
    });
});
app.get('/change/:filename', (req, res) => {
    res.render('changeName',
        {filename: req.params.filename}
    );
});

app.post('/change', (req, res) => {
    
    fs.rename(`./files/${req.body.current}`, `./files/${req.body.new}.txt`, (err) => {
    res.redirect('/');
    
})
});
app.post('/create', (req, res) =>{
    fs.writeFile(`./files/${req.body.title.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('')}.txt`
        , req.body.details
        , (err) => {
        res.redirect('/');
    });
    
});




app.listen(3000);