class UserService {
    getID() {
        const userStorage = JSON.parse(sessionStorage.getItem("CSUser"))
        const uid = userStorage.user.uid
        return uid
    }
}
export default new UserService()