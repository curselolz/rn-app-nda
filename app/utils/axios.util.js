import axios from 'axios'
import { DEFAULT_URL } from './config.util';

export default setAxiosDefaults = token => {
    axios.defaults = {
        baseURL: DEFAULT_URL,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Authorization': token !== null && token !== undefined && `Bearer ${token}`
        }
    }
}
