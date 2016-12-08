var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./app/models/user');
var Article = require('./app/models/article');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => res.json('Hello there'));

router.route('/users/:username')
  .get((req, res) => {
    User.findOne({ username: req.params.username }, (err, users) => {
      if (err) {
        return res.send(err);
      }
      res.json(user);
    });
  })
  .post((req, res) => {
    var user = new User();

    Object.assign(article, req.body, { name: req.params.username });

    user.save(err => {
      if (err) {
        return res.send(err);
      }
      res.json({ message: 'User created!' });
    });
  })
  .put((req, res) => {
    User.findOneAndUpdate({ username: req.params.username }, { username: req.body.username }, err => {
      if (err) {
        return res.send(err);
      }
      res.json({ message: 'Article updated!' });
    });
  })
  .delete((req) => {
    User.findOneAndRemove({ username: req.params.username }, err => {
      if (err) {
        return res.send(err);
      }
      res.json({ message: 'Article updated!' });
    });
  });

router.route('/articles').post((req, res) => {
  var article = new Article();

  Object.assign(article, req.body);

  article.save(err => {
    if (err) {
      return res.send(err);
    }
    res.json({ message: 'Article created!' });
  });
});

router.route('/articles/:id')
  .put((req, res) => {
    Article.findOneAndUpdate({ _id: req.params.id }, req.body, err => {
      if (err) {
        return res.send(err);
      }
      res.json({ message: 'Article updated!' });
    });
  })
  .delete((req, res) => {
    Article.findOneAndRemove({ _id: req.params.id }, err => {
      if (err) {
        return res.send(err);
      }
      res.json({ message: 'Article deleted!' });
    });
  });


app.use('/', router);

app.listen(3000, () => console.log('App listening on port 3000'));
