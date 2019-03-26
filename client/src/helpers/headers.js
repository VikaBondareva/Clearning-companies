export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("ACCESS_____________");
    console.log(user.accessToken);
    if (user && user.accessToken) {
        return { 'Authorization': 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}

export function authRefreshHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("REFRESH_____________");
    console.log(user.refreshToken);
    if (user && user.refreshToken) {
        return { 'Refresh-token':'Bearer '+ user.refreshToken };
    } else {
        return {};
    }
}