class Users {
    constructor(id) {
        this.id = id;
        this.users = [];
    }

    // ADD USER TO THIS.USERS ARRAY
    addUser(ASSIGNED, NAME, DATE,) {
        ASSIGNED = document.getElementById('ASSIGNED')
        NAME = document.getElementById('NAME')
        DATE = document.getElementById('DATE')
        let assignVal = ASSIGNED.value;

        // VALIDATION EXAMPLE
        if (!assignVal) {
            console.log("Enter values")
        } else {

            let newUser = {
                id: this.id++,
                assign: ASSIGNED,
                name: NAME,
                date: DATE,
            }
            // PUSH NEW USER HERE
            this.users.push(newUser)
            // SAVE TO LOCAL STORAGE
            this.save(newUser)

        }
    }

    // SHOW ALL USERS IN THIS.USERS ARRAY
    showUsers() {
        for (let i = 0; i < this.users.length; i++) {
            console.log(this.users[i])
        }
    }

    // DELETE USER
    deleteUser(id) {
        this.users.splice(id, 1)
    }

    // SAVE TO LOCAL STORAGE
    save(item) {
        localStorage.setItem("user", item)

    }

    // RETRIEVE LOCAL STORAGE
    load() {
        console.log(localStorage.getItem("user"))
    }

}

// NEW INSTANCE OF USER INITIALISED WITH 0 ID
let newUser = new Users(0);

// ADD USER
newUser.addUser()

//newUser.deleteUser(0)

newUser.showUsers()
newUser.load()