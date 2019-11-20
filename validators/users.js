const createUser = {
    first_name: "required|string",
    last_name: "required|string",
    email: "required|string",
    password: "required|string|minLength:3"
}

module.exports = {
    createUser
}