// comments.js - commments route module.

const db = require('../db/mysqlConnect').default;
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/:eventId', (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      throw new Error('eventId required!');
    }

    db.query(`SELECT * FROM comments WHERE event_id=${eventId}`, (err, row) => {
      if (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Что-то пошло не так!' });
      }

      if (row.length > 0) {
        return res.json({
          status: 'success',
          payload: _.map(row, (comment) => {
            return {
              id: comment.id,
              message: comment.message,
              userName: comment.user_name,
              timeStamp: comment.create_timestamp,
            };
          }),
        });
      }

      res.json({ status: 'success', payload: [] });
    });
  } catch(e) {
    console.error(e);
    res.json({ 'status': 'error', message: e.message, payload: [] });
  }
});

router.post('/comment', (req, res) => {
  try {
    const { eventId, userToken, message } = req.body;
    if (!eventId || !userToken || !message) {
      throw new Error('eventId, userToken, message required!');
    }

    db.query(`SELECT id, name FROM users WHERE token='${userToken}'`, (err, row) => {
      if (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Что-то пошло не так!' });
      }

      const user = row[0];

      if (row.length === 0) {
        return res.json({ status: 'error', message: 'Такого пользователя не существует' });
      }

      db.query(`INSERT INTO comments (event_id, user_id, message, user_name) VALUES ('${eventId}', '${user.id}', '${message}', '${user.name}')`,
        (err, row) => {
          if (err) {
            console.error(err);
            return res.json({ status: 'error', message: 'Что-то пошло не так!' });
          }

          res.json({ status: 'success', message: 'Комментарий успешно добавлен!' });
        }
      );
    });
  } catch(e) {
    console.error(e);
    res.json({ 'status': 'error', message: e.message });
  }
});

router.delete('/comment', (req, res) => {
  // если юзер является создателем события, то он может удалять его комментарии
  try {
    const { eventId, userToken, commentId } = req.body;
    if (!eventId || !userToken || !commentId) {
      throw new Error('eventId, userToken, commentId required!');
    }

    db.query(`SELECT slug FROM users WHERE token='${userToken}'`, (err, row) => {
      if (err) {
        console.error(err);
        return res.json({ status: 'error', message: 'Что-то пошло не так!' });
      }

      const user = row[0];

      if (row.length === 0) {
        return res.json({ status: 'error', message: 'Такого пользователя не существует' });
      }

      db.query(`SELECT id FROM events WHERE user_slug='${user.slug}' AND id='${eventId}'`, (err, row) => {
        if (err) {
          console.error(err);
          return res.json({ status: 'error', message: 'Что-то пошло не так!' });
        }

        if (row.length === 0) {
          return res.json({ status: 'error', message: 'Что-то пошло не так!' });
        }

        db.query(`DELETE FROM comments WHERE id='${commentId}'`, (err) => {
          if (err) {
            console.error(err);
            return res.json({ status: 'error', message: 'Что-то пошло не так!' });
          }

          res.json({ status: 'success', message: 'Комментарий успешно удален!' });
        });
      });
    });
  } catch(e) {
    console.error(e);
    res.json({ 'status': 'error', message: e.message });
  }
});

module.exports = router;