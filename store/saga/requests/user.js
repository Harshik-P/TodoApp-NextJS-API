import { setTokenCookie } from '../../../src/auth/tokenCookies';

export const getUser = async ({ email, password }) => {
    const data = await fetch(`https://task-manager-aryankush25.herokuapp.com/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then((t) => t.json());
    if (data) {
        setTokenCookie(data.token);
    }
    return data;
}