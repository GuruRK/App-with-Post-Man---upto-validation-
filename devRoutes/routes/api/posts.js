const express = require ( 'express')
const router = express.Router();

//Route - Get api/posts/test
//desc  - Tests post route
//access- Public
router.get('/test', (req, res) => res.json({msg: "Post Works"}))

module.exports = router;