const express = require('express');
const router = express.Router();
const auth = require('../auths.js');

const Todo = require('../Controllers/addTodo.js');
const {deactivatedTodo} = require('../Controllers/deactivateTodo.js')
const {updateTodo} = require('../Controllers/updateTodo.js');
const {addCommentTodo} = require('../Controllers/addCommentTodo.js')
const { deleteComment} = require('../Controllers/deleteComment.js')
const { updateComment} = require('../Controllers/updatedCommentTodo.js')

router.post('/addTodo', auth.verify, Todo.addTodo);
router.put('/deactivatedTodo/:todoId',auth.verify, deactivatedTodo);
router.put('/updateTodo/:todoId',auth.verify, updateTodo)
router.put('/addCommentTodo/:todoId', auth.verify, addCommentTodo)
router.put('/deleteComment/:todoId', auth.verify, deleteComment)
router.put('/updateComment/:todoId', auth.verify,updateComment)



module.exports = router;