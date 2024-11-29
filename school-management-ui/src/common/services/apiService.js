import { baseURL } from '../configs/urls';
import ApiError from './ApiError';

const apiCall = async (specialURL, method = 'GET', body = null, headers = {}) => {
    let errorData = null;
    try {
        const whatToCall = `${baseURL + specialURL} ${method}`;
        console.log('calling API... ', whatToCall, ' - Body ', body);

        const response = await fetch(baseURL + specialURL, {
            method,
            headers: { 'Content-Type': 'application/json', ...headers },
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            errorData = await response.json();
            console.error(`API call failed ${whatToCall} - error `, errorData);
            throw new Error();
        }
        const data = await response.json();
        console.log(`API call Successful ${whatToCall} - data `, data);
        return { response: data, errorMessage: null };
    } catch (e) {
        if (errorData == null) {
            return { response: null, errorMessage: e.message };
        }
        return { response: null, errorMessage: errorData.error_message };
    }
};

export default apiCall;
