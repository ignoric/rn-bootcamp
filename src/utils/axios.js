import axios from 'axios';
import Constants from 'expo-constants';

const { apiBaseUrl, backendToken } = Constants.expoConfig?.extra ?? {};

const resolvedBaseURL = process.env.API_BASE_URL || apiBaseUrl || 'http://localhost:3010/';

const axiosServices = axios.create({
	baseURL: resolvedBaseURL
});

// Attach Authorization only if token exists
axiosServices.interceptors.request.use((config) => {
	const token = process.env.BACK_END_TOKEN || (Constants.expoConfig?.extra ?? {}).backendToken || backendToken || '';
	if (token) {
		config.headers = {
			...(config.headers || {}),
			Authorization: `Bearer ${token}`
		};
	}
	return config;
});

axiosServices.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error?.response?.status;
		if (status === 401) {
			// สามารถเพิ่มการนำทางไปหน้า Login ได้ตามต้องการ
		}
		return Promise.reject(error?.response?.data || error);
	}
);

export default axiosServices; 