
const isAdminAuthenticated = (req, res, next) => {
    const token = "abcd";

    const isAuthorized = token === "abcd";

    if (isAuthorized) {
        next();
    } else {
        res.status(401).json({ message: "admin not authorized" });
    }
}

const isUserAuthenticated = (req, res, next) => {
    const token = "111";

    const isAuthorized = token === "11";

    if (isAuthorized) {
        next();
    } else {
        res.status(401).json({ message: "user not authorized" });
    }
}


export { isAdminAuthenticated, isUserAuthenticated }