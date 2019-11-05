const ApiControllers = require('../controllers/api');
const express = require('express');
const router = express.Router();
router.use(ApiControllers.search_api);
module.exports=router;