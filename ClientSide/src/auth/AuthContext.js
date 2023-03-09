export const IsLoggedinHandler = (id, username) => {
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('isLoggedIn', true);
    console.log("loggedin")
}

export const IsLoggedoutHandler = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.setItem('isLoggedIn', false);
    console.log("loggedout")
}