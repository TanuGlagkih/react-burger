export const baseUrl = 'https://norma.nomoreparties.space/api';

export function checkResponse(res) {
    return  res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}