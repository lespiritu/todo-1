const Todo = require('../Models/todoShema.js')
const auth = require('../auths');




module.exports.addTodo = (request, response)=>{
    const input = request.body;
    const userData = auth.decode(request.headers.authorization);

    
if(userData.email){
    
    let newTodo = new Todo(
        {   
            userId: userData._id,
            userEmail: userData.email,
            title:input.title,
            description:input.description
        }
    )

    // This will add and save the new product to database product collection
    return newTodo.save()
    .then(data => response.send({
        "status":"success",
        "message":"Todo is now added to the database!",
        data
    }))
    .catch(error => response.send(error))
}
  else{
    response.send({
        "status":"failed",
        "message":"log in to add todo!"
    })
  }
    

}




