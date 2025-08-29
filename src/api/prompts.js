import axios from '../utils/axios';

export const promptsLibraryIndex = async () => {
	const url = '/prompts_library/prompts_library_index';
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		throw error;
	}
}; 