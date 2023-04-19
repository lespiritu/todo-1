const Todo = require('../Models/todoShema.js')
const auth = require('../auths');




module.exports.addCommentTodo = (request, response)=>{
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
                if(input.comment){
                    data.comments.push(input.comment)
                data.save()
                .then(updatedData => response.send(updatedData) )
                .catch(error => response.send(error))
                }
                else{
                    response.send({
                        "status" : "failed",
                        "message": "Add a comment!"
                    })
                }
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




