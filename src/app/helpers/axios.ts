import axios, { AxiosError } from 'axios';
import { clearAllLocalStorageItems, getLocalStorageItem } from '../helpers/storage';
import { VARIABLES } from '../utils/Variables';
import {API_URLS} from "../utils/EndPoints"


type RequestType = {
    url:string;
    data?:object;
    config:object;
    includeToken:boolean
}

const axiosInstance = axios.create({
  baseURL: API_URLS.BaseURL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

const setAuthToken = async () => {
  try {
    const USER_TOKEN = await getLocalStorageItem(VARIABLES.USER_TOKEN);
    if (USER_TOKEN) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${USER_TOKEN}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error setting auth token:', error);
    // Handle the error if necessary
  }
};

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class NetworkError extends Error {
  constructor(message) {
    super(message);
  }
}

class SocketError extends Error {
  constructor(message) {
    super(message);
  }
}

const checkUnAuth = async (error:object|string) => {
  if (error === 'Unauthenticated') {
    // store.dispatch(setLoggedIn(false));
    await clearAllLocalStorageItems()
  }
};

const handleRequestError = (error:AxiosError) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      // Check for network error or socket timeout
      if (error.code === 'ECONNABORTED') {
        throw new SocketError(
          'Socket timeout: The request took too long to complete.',
        );
      }
      throw new NetworkError('No Internet Connection');
    }
    const status = error.response.status;
    if (status) {
      const responseData = error.response.data;
      if (responseData.error) {
        checkUnAuth(responseData.error.messages[0]);
        throw new HttpError(responseData.error.messages[0], status);
      } else if (responseData.errors || responseData.message) {
        checkUnAuth(responseData.message);
        throw new HttpError(responseData.message, status, responseData.errors);
      } else {
        throw new HttpError(error.response.statusText, status);
      }
    }
  }
  throw error;
};

const makeHttpRequest = async ({config, includeToken = true}:RequestType) => {
  try {
    if (includeToken) {
      await setAuthToken();
    }
    const response = await axiosInstance(config);
    if (response?.data?.response) {
      return response?.data?.response;
    } else {
      return response?.data;
    }
  } catch (error:any) {
    if (error?.response?.data?.error?.type === "card_error") {
      throw new HttpError(error?.response?.data?.error?.message,error?.response?.data?.error?.code);
    }
    else {

      handleRequestError(error);
    }
  }
};

const get = async ({ url, config = {}, includeToken = true }:RequestType) => {
  return makeHttpRequest({ method: 'GET', url, ...config }, includeToken);
};

const post = async ({ url, data, config = {}, includeToken = true }:RequestType) => {
  return makeHttpRequest({ method: 'POST', url, data, ...config }, includeToken);
};

const put = async ({ url, data, config = {}, includeToken = true }:RequestType) => {
  return makeHttpRequest({ method: 'PUT', url, data, ...config }, includeToken);
};

const patch = async ({ url, data, config = {}, includeToken = true }:RequestType) => {
  return makeHttpRequest({ method: 'PATCH', url, data, ...config }, includeToken);
};

// const remove = async (url, config={}, includeToken = true) => {
//   return makeHttpRequest({ method: 'DELETE', url, ...config }, includeToken);
// };

const remove = async ({ url, data = {}, config = {}, includeToken = true }:RequestType) => {
  const headers = {
    'Content-Type': 'application/json', // Set the appropriate content type
    ...(config.headers || {}),
  };

  const requestOptions = {
    method: 'DELETE',
    url,
    headers,
    data: JSON.stringify(data), // Convert data to JSON string
    ...config,
  };

  return makeHttpRequest(requestOptions, includeToken);
};

const postWithSingleFile = async ({
  url,
  // file,
  // fileName,
  data,
  config = {},
  includeToken = true,
}) => {
  const formData = new FormData();
  // if (file != null && typeof file !== 'string') {
  //   formData.append(fileName, {
  //     uri: file?.path,
  //     type: file?.mime ?? 'video/mp4',
  //     name: fileName === 'video' ? fileName + '.mp4' : fileName,
  //   });
  // }
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  return makeHttpRequest(
    {
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    },
    includeToken,
  );
};

const patchWithSingleFile = async ({
  url,
  data,
  config = {},
  includeToken = true,
}) => {
  const formData = new FormData();
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('_method', 'PATCH');
  }
  return makeHttpRequest(
    {
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    },
    includeToken,
  );
};

export {
  setAuthToken,
  get,
  post,
  put,
  patch,
  remove,
  postWithSingleFile,
  // postWithMultipleFiles,
  patchWithSingleFile,
};
