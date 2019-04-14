export function authHeader() {
    let token = JSON.parse(localStorage.getItem('tokens'));
    console.log("ACCESS_____________");
    console.log(token.accessToken);
    if (token && token.accessToken) {
        return { 'Authorization': 'Bearer ' + token.accessToken };
    } else {
        return {};
    }
}

export function authRefreshHeader() {
    let token = JSON.parse(localStorage.getItem('tokens'));
    console.log("REFRESH_____________");
    console.log(token.refreshToken);
    if (token && token.refreshToken) {
        return { 'Authorization':'Bearer '+ token.refreshToken };
    } else {
        return {};
    }
}