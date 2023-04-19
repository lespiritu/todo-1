
const Todo = require('../Models/todoShema.js');
const auth = require('../auths.js');



module.exports.updateTodo = (request, response)=>{
    const input = request.body;
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
                data.title = input.title;
                data.description = input.description;
                
                data.save()
                .then(updatedData => response.send({
                    "status":"success",
                    "message": "successfully update to do item",
                    updatedData
                }) )
                .catch(error => response.send(error))
            }else{
                response.send({
                    "status" : "failed",
                    "message": "You cannot update or change this to do item!"
                })
            }
            
        }
    })
    .catch(error => response.send(error))
    

    
}

