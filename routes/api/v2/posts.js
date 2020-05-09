const express = require('express');

const router = express.Router();
const postApi = require("../../../controllers/api/v2/posyApi");

router.get('/', postApi.index);
router.delete('/:id', postApi.destroy);

module.exports = router;