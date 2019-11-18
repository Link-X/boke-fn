// export default (store) => {
//     require('./houselist').default(store);
// };

const files = require.context('.', false, /\.js$/)
const modules = []

files.keys().forEach((key) => {
    if (key === './index.js') return
    modules.push(key.replace(/(\.\/|\.js)/g, ''))
})


export default modules