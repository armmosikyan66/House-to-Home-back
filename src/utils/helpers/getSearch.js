async function getSearchedData(searchObject) {
    const searchTerm = [];
    for (const [key, value] of Object.entries(searchObject)) {
        switch (key) {
            case "q":
                if (/\d/.test(value)) {
                    const queryNumber = parseInt(JSON.parse(value), 10);
                    searchTerm.push({ prdId: queryNumber });
                } else {
                    const queryRegex = new RegExp(value.slice(1, -1), "i");
                    searchTerm.push({ author: queryRegex });
                }
                break;
            case "u":
                if (/\d/.test(value)) {
                    const queryNumber = parseInt(JSON.parse(value), 10);
                    searchTerm.push({ phoneNumber: queryNumber });
                } else {
                    const queryRegex = new RegExp(value.slice(1, -1), "i");
                    searchTerm.push({$or: [{firstName: queryRegex}, {lastName: queryRegex}, {email: queryRegex}]});
                }
                break;
        }
    }
    return { $and: searchTerm };
}

export default getSearchedData;