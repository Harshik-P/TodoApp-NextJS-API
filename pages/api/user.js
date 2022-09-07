export function getUserJWT(req) {
    const { cookies } = req;

    const jwt = cookies.token;

    // if (!jwt) {
    //     return res.json({ message: "Invalid token!" });
    // }

    return jwt
}
