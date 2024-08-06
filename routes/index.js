const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  knex("tasks")
    .select("*")
    .where({ user_id: userId }) // ユーザーIDに基づいてタスクをフィルタリング
    .then(function (results) {
      res.render('index', {
        title: 'ToDo App',
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
      });
    });
});

router.post('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const todo = req.body.add;
  knex("tasks")
    .insert({user_id: userId, content: todo})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
      });
    });
});

// 新しいルート: タスクの編集
router.put('/todos/:id', function (req, res, next) {
  const userId = req.session.userid;
  const taskId = req.params.id;
  const newContent = req.body.content;
  
  knex("tasks")
    .where({ id: taskId, user_id: userId })
    .update({ content: newContent })
    .then(function () {
      res.json({ success: true });
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    });
});

// 新しいルート: タスクの削除
router.delete('/todos/:id', function (req, res, next) {
  const userId = req.session.userid;
  const taskId = req.params.id;
  
  knex("tasks")
    .where({ id: taskId, user_id: userId })
    .del()
    .then(function () {
      res.json({ success: true });
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    });
});

// 新しいルート: タスクの完了状態の切り替え
router.post('/todos/:id/toggle', function(req, res, next) {
  const userId = req.session.userid;
  const taskId = req.params.id;
  const completed = req.body.completed;
  
  knex("tasks")
    .where({ id: taskId, user_id: userId })
    .update({ completed: completed })
    .then(function() {
      res.json({ success: true });
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    });
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;