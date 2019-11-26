const store = {
    state: {},
    set(key, data) {
        if (typeof data === 'object') {
            this.state[key] = JSON.parse(JSON.stringify(data))
        } else {
            this.state[key] = data
        }
        return this.state[key]
    },
    remove(key) {
        if (this.state[key]) {
            delete this.state[key]
        }
    },
    get(key) {
        return this.state[key]
    }
}
export default store