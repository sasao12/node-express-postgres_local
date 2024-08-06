// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('../db/knex'); // knexの設定に合わせてパスを調整してください

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    function(username, password, done) {
      knex('users').where({ username: username }).first()
        .then(user => {
          if (!user) { return done(null, false); }
          if (user.password !== password) { return done(null, false); } // 注意: 本番環境ではパスワードをハッシュ化して比較すべきです
          return done(null, user);
        })
        .catch(err => done(err));
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    knex('users').where({ id: id }).first()
      .then(user => done(null, user))
      .catch(err => done(err));
  });
};