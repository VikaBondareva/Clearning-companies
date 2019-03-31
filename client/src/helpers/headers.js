export function authHeader() {
    let token = JSON.parse(localStorage.getItem('token'));
    console.log("ACCESS_____________");
    console.log(token.accessToken);
    if (token && token.accessToken) {
        return { 'Authorization': 'Bearer ' + token.accessToken };
    } else {
        return {};
    }
}

export function authRefreshHeader() {
    let token = JSON.parse(localStorage.getItem('token'));
    console.log("REFRESH_____________");
    console.log(token.refreshToken);
    if (token && token.refreshToken) {
        return { 'Refresh-token':'Bearer '+ token.refreshToken };
    } else {
        return {};
    }
}