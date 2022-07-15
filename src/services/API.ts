export const baseUrl: string = 'https://norma.nomoreparties.space/api';

export const checkResponse = <T>(res: Response): Promise<T> => {
    return  res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}  