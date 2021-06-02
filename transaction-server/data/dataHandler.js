const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');

const getData = () => {
    return fs.readFileSync(dataPath, (err, data) => {
        if (err) throw err;
        return data;
    });
}

const setData = (data) => {
    fs.writeFileSync(dataPath, data, 'utf8');
}

module.exports = {
    getData,
    setData
}