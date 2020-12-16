export const API_URL='https://timesheet-klaster.herokuapp.com';

export const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
});


export function request(url, method, dataset) {
    return new Request(url, {
        method: method,
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(dataset)
    });
}