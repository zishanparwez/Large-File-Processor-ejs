const express = require('express');
const { connect } = require("mongoose");
const { success, error } = require("consola");
const { DB, PORT } = require("./api/config");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
  res.render('home', {title: 'Large File Proessor'});
});



app.use('/api/products', require('./api/routes/Products/products'));

const startApp = async () => {
    try {
      // Connection With DB
      await connect(DB, {
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
  
      success({
        message: `Successfully connected with the Database \n${DB}`,
        badge: true,
      });
  
      // Start Listenting for the server on PORT
      app.listen(PORT, () =>
        success({ message: `Server started on PORT ${PORT}`, 
        badge: true })
      );
    } catch (err) {
      error({
        message: `Unable to connect with Database \n${err}`,
        badge: false,
      });
      startApp();
    }
  };
  
  startApp();