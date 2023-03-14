async function getFilteredData(filterObject, lang = "en") {
    const filters = [];

    for (const [key, value] of Object.entries(filterObject)) {
        switch (key) {
            case "price":
            case "areaSize":
                const from = value.from || 0;
                const to = value.to || Infinity;

                filters.push({
                    [key]: {$gte: from, $lte: to},
                });
                break;
            case "baths":
            case "rooms":
                const checkSymbol = value.toString().indexOf("+");

                if (checkSymbol !== -1) {
                    filters.push({
                        [key]: {
                            $gte: Number.parseInt(value.slice(0, checkSymbol)),
                        },
                    });
                } else {
                    filters.push({
                        [key]: {
                            $gte: Number.parseInt(value),
                        },
                    });
                }
                break;
            default:
                filters.push({
                    [`${key}.${lang}`]: value.toLowerCase(),
                });
                break;
        }
    }

    return {$and: filters};
}

export default getFilteredData;
