let users = [];

//Join user tp chat
function userJoin(id, username, room){
    const user = { id, username, room };

    cleanUsers(user.id)

    users.push(user);   

    return user;
}
//Clean recurring users
function cleanUsers(id){
    users = users.filter(el => el.id !== id);
}

//Get current user
function getCurrentUser(id){
    return users.find(user => user.id === id)
}

//User leaves chat
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    } 
}

// Get room users
function getAllUsers() {
    return users.map(el => {
        return `${el.username} in chat${el.room}`
    })
  }

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getAllUsers
}