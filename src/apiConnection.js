//export const API_URL='http://ec2-18-197-149-172.eu-central-1.compute.amazonaws.com:3001';
//export const API_URL='http://192.168.0.136:3001';
export const API_URL='http://127.0.0.1:3001';
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