import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { REGISTRY_SERVICE, CALLED_SERVICE_VERSION } from '../constants';

export const getService = async (servicename: string) => {
    const responce: AxiosResponse = await axios.get(
        `${REGISTRY_SERVICE}/find/${servicename}/${CALLED_SERVICE_VERSION}`
    );
    return responce.data;
};

export const callService = async (requestOptions: AxiosRequestConfig) => {
    const responce = await axios(requestOptions);
    return responce.data;
};
