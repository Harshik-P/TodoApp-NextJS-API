export const setTokenCookie = (token) => {
    fetch("/api/auth/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });
};

export const removeTokenCookie = () => {
    fetch("/api/auth/logout", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
};
