const PORT = process.env.PORT || 3000;

var express = require("express");
var app = express();
app.set('view engine','ejs');
app.set('views', __dirname + "/../view")


app.get('/', (req: any, res: any) => {
  res.render('hello.ejs')
})

app.use((req: any, res: any) => {
  res.status(404).send('Error 404');
});

app.listen(PORT, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${PORT}`)
})
