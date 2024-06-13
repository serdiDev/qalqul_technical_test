const express = require('express');
const router = express.Router();
const { documents } = require('../data/store');

router.get('/documents', (req, res) => {
    res.json(documents);
});

module.exports = router;