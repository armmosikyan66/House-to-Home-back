async function getFilteredData(filterObject, lang = "en") {
    const filters = [];

    for (const [key, value] of Object.entries(filterObject)) {
        switch (key) {
            case "price":
            case "areaSize":
                const from = JSON.parse(value).from || 0;
                const to = JSON.parse(value).to || Infinity;

                filters.push({
                    [key]: {$gte: from, $lte: to},
                });
                break;
            case "baths":
            case "rooms":
                const checkSymbol = JSON.parse(value).toString().indexOf("+");

                if (checkSymbol !== -1) {
                    filters.push({
                        [key]: {
                            $gte: Number.parseInt(JSON.parse(value).slice(0, checkSymbol)),
                        },
                    });
                } else {
                    filters.push({
                        [key]: {
                            $gte: Number.parseInt(JSON.parse(value)),
                        },
                    });
                }
                break;
            default:
                filters.push({
                    [`${key}.${lang}`]: JSON.parse(value).toLowerCase(),
                });
                break;
        }
    }

    return {$and: filters};
}

export default getFilteredData;
