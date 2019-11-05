const express=require('express');
const router=express.Router();
const ApiController=require('../controllers/api')
//no need to make an express object viz app here because we are not going to use that
router.use(ApiController.ping_api);
module.exports=router;

