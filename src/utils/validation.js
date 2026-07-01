const calDOB = (dob) => {
    const today = new Date();
    const dov = new Date(dob);
    let age = today.getFullYear() - dov.getFullYear();
    const month = today.getMonth() - dov.getMonth();
    if (month < 0 || month === 0 && today.getDate() < dob.getDate()) {
        age--;
    }


    if (age < 18) {
        throw new Error("You must be atleast 18 years old");
    }
    return age;
};


const validateUser = (safedata) => {
    const { firstname, lastname, username, email, dob, password } = safedata;

    const validusername = (username) => {
        const upattern = /^[a-zA-Z0-9_]+$/;
        return upattern.test(username);
    }

    if (!firstname || !username || !email || !dob || !password) {
        throw new Error("Please fill all the required fields");
    }

    if (!validator.isAlpha(firstname) || firstname.length < 3 || firstname.length > 20) {
        throw new Error("First name should be alphabetic");
    }
    if (!validator.isAlpha(lastname) || lastname.length < 3 || lastname.length > 20) {
        throw new Error("Last name should be alphabetic");
    }
    if (!validusername(username)) {
        throw new Error("Username should be alphabetic");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    if (!validator.isDate(dob)) {
        throw new Error("Date of birth is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not valid");
    }

};


const checkPassword = (password, conformpassword) => {
    if (!password || !conformpassword) {
        throw new Error("Passwords are required");
    } else if (password !== conformpassword) {
        throw new Error("Passwords do not match");
    }
}


const hash = async (password) => {
    const hashed = await bcrypt.hash(password, 15);
    return hashed;

}

export { calDOB, validateUser, checkPassword, hash };