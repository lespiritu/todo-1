const Todo = require('../Models/todoShema.js')
const auth = require('../auths.js')

module.exports.deactivatedTodo = (request, response) =>{
    const userData = auth.decode(request.headers.authorization);
    const todoId = request.params.todoId;


        Todo.findById(todoId)
        .then(data => {
            if( data === null){
                response.send({
                    "status" : "failed",
                    "message": "Invalid Product ID!"
                })
            }
            else{

                if(userData._id == data.userId){
                    data.isActive = false;
                    data.save()
                    .then(updatedData => response.send({
                        "status":"success",
                        "message":"To do successfully deactived or deleted!",
                        updatedData
                    }) )
                    .catch(error => response.send(error))
                }else{
                    response.send({
                        "status" : "failed",
                        "message": "You cannot delete or change this to do item!"
                    })
                }
                
            }
        })
        .catch(error => response.send(error))
    
}