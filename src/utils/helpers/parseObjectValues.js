function parseObjectValues(obj) {
    const parsedObj = {};

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            try {
                parsedObj[key] = JSON.parse(obj[key]);
            } catch (e) {
                parsedObj[key] = obj[key];
            }
        }
    }

    return parsedObj;
}

export default parseObjectValues;