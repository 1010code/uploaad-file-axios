const express=require('express');
const hbs = require('hbs');
const multer = require('multer');

const app =express();
app.set('view engine','hbs');

app.get('/home',(req,res)=>{
  res.render("home.hbs");
});

app.post('/upload', (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/public");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()+'.zip');
    }
  })

  const upload = multer({ storage: storage }).array('zipfile', 1);
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
      res.send(err);
    }
    // Everything went fine.
    res.send('success');
  })
});

const server =app.listen(4040,()=>{
  console.log(`server start on port ${server.address().port}`);
})



