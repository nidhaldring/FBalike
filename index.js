const config = require('./config');
const { loadApp, connectToDB } = require('./loaders');

async function runApp() {
    const app = loadApp();
    const port = config.app.port;
    connectToDB()
        .then(() => app.listen(port, () => console.log(port)));
}

// run on port 5050
runApp();
