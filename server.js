var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./app/models/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => res.json('Hello there'));

router.route('/users/:username')
  .get((req, res) => {
    User.findOne({ username: req.params.username }, (err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  })
  .post((req, res) => {
    var user = new User();

    user.name = req.params.username;
    user.password = req.body.password;

    user.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'User created!' });
    });
  })
  .put((req, res) => User.findOneAndUpdate({ username: req.params.username }, { username: req.body.username })
  .delete((req, res) => User.findOneAndRemove({ username: req.params.username });

app.use('/', router);

app.listen(3000, () => console.log('App listening on port 3000'));
