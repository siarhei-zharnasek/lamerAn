var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./app/models/user');

mongoose.connect('mongodb://localhost');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => res.json('Hello there'));

router.route('/users')
  .post((req, res) => {
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
user.markModified('name');
    user.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'User created!' });
    });
  })
  .get((req, res) => {
    User.find((err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  })

app.use('/', router);

app.listen(3000, () => console.log('App listening on port 3000'));
