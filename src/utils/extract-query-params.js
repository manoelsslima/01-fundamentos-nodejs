// ?search=Manoel
export function extractQueryParams(query) {
    // reduce traverse the array e transform in anything else (second param)
    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split('=');

        queryParams[key] = value;

        return queryParams;
    }, {}); // search=Manoel
}