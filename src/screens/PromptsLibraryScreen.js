import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Box, Text, VStack, HStack, Spinner, Heading, Icon, Input, Badge, useColorModeValue, Pressable, Avatar } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { promptsLibraryIndex } from '../api/prompts';

const formatDateTime = (value) => {
	try {
		const d = new Date(value);
		if (isNaN(d.getTime())) return String(value ?? '');
		return d.toLocaleString();
	} catch {
		return String(value ?? '');
	}
};

const ItemCard = ({ item, textColor, subtitleColor, cardBgColor, borderColor }) => {
	return (
		<Box bg={cardBgColor} rounded="lg" shadow={1} borderWidth={1} borderColor={borderColor} p={4} mb={3}>
			<VStack space={3}>
				<HStack alignItems="center" justifyContent="space-between">
					<HStack alignItems="center" space={2} flex={1}>
						<Avatar bg="primary.500" size="sm">{String(item?.id ?? '?')}</Avatar>
						<Text fontSize="md" fontWeight="bold" color={textColor} flexShrink={1} noOfLines={2}>
							{item?.goal_text || 'Prompt'}
						</Text>
					</HStack>
					{/* <Badge colorScheme="purple" variant="subtle" rounded="full">ID: {item?.id ?? '-'}</Badge> */}
				</HStack>
				<Text fontSize="sm" color={subtitleColor}>{item?.text}</Text>
				<HStack alignItems="center" justifyContent="space-between">
					<HStack space={1} alignItems="center">
						<Icon as={MaterialIcons} name="event" size="xs" color={subtitleColor} />
						<Text fontSize="xs" color={subtitleColor}>{formatDateTime(item?.created_at)}</Text>
					</HStack>
				</HStack>
			</VStack>
		</Box>
	);
};

const PromptsLibraryScreen = ({ navigation }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState('');

	const pageBg = useColorModeValue('gray.50', 'gray.800');
	const cardBgColor = useColorModeValue('white', 'gray.700');
	const borderColor = useColorModeValue('coolGray.200', 'coolGray.600');
	const textColor = useColorModeValue('coolGray.900', 'white');
	const subtitleColor = useColorModeValue('coolGray.600', 'coolGray.300');
	const codeBlockBg = useColorModeValue('coolGray.100','gray.800');

	const codeSample = `// .env
API_BASE_URL=http://webhub.utcc.ac.th:8000/
BACK_END_TOKEN=YOUR_TOKEN

// app.config.js
import 'dotenv/config';
export default ({ config }) => ({
  ...config,
  extra: {
    apiBaseUrl: process.env.API_BASE_URL,
    backendToken: process.env.BACK_END_TOKEN
  }
});

// src/utils/axios.js (ย่อ)
import axios from 'axios';
import Constants from 'expo-constants';
const { apiBaseUrl, backendToken } = Constants.expoConfig?.extra ?? {};
const client = axios.create({ baseURL: apiBaseUrl });
client.interceptors.request.use(cfg => {
  if (backendToken) cfg.headers = { ...(cfg.headers||{}), Authorization: 'Bearer TOKEN_HERE' };
  return cfg;
});
export default client;

// src/api/prompts.js
import client from '../utils/axios';
export const promptsLibraryIndex = async () => {
  const res = await client.get('/prompts_library/prompts_library_index');
  return res.data;
};`;

	const fetchData = async () => {
		try {
			setError(null);
			const res = await promptsLibraryIndex();
			const items = Array.isArray(res) ? res : (res?.data || []);
			setData(items);
		} catch (e) {
			setError(e?.message || 'Fetch error');
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchData();
	}, []);

	const filtered = useMemo(() => {
		if (!query) return data;
		const q = query.toLowerCase();
		return data.filter((it) =>
			String(it?.goal_text || '').toLowerCase().includes(q) ||
			String(it?.text || '').toLowerCase().includes(q) ||
			String(it?.id || '').toLowerCase().includes(q)
		);
	}, [data, query]);

	if (loading) {
		return (
			<Box flex={1} alignItems="center" justifyContent="center" bg={pageBg}>
				<Spinner size="lg" color="primary.500" />
				<Text mt={3} color={subtitleColor}>กำลังโหลดข้อมูล...</Text>
			</Box>
		);
	}

	return (
		<Box flex={1} bg={pageBg}>
			<Box safeArea flex={1}>
				<FlatList
					data={filtered}
					keyExtractor={(item, index) => String(item?.id ?? index)}
					renderItem={({ item }) => (
						<ItemCard
							item={item}
							textColor={textColor}
							subtitleColor={subtitleColor}
							cardBgColor={cardBgColor}
							borderColor={borderColor}
						/>
					)}
					ListHeaderComponent={(
						<VStack px={3} py={3} space={3}>
							{/* Header */}
							<HStack space={3} alignItems="center">
								<Pressable onPress={() => navigation?.goBack?.()} _pressed={{ opacity: 0.7 }}>
									<Icon as={MaterialIcons} name="arrow-back" size="md" color={textColor} />
								</Pressable>
								<Heading size="md" color={textColor} flex={1}>Prompts Library</Heading>
							</HStack>

							{/* How-to Section */}
							<Box bg={cardBgColor} borderWidth={1} borderColor={borderColor} rounded="lg" p={3}>
								<VStack space={2}>
									<Text fontSize="md" fontWeight="bold" color={textColor}>วิธีเชื่อมต่อและดึงข้อมูล (ตัวอย่าง)</Text>
									<Text fontSize="sm" color={subtitleColor}>1) ตั้งค่า .env และ app.config.js  2) สร้าง axios instance  3) เขียนฟังก์ชันเรียก API</Text>
									<Box bg={codeBlockBg} rounded="md" p={3}>
										<Text fontSize="xs" fontFamily="monospace" color={textColor}>
											{codeSample}
										</Text>
									</Box>
								</VStack>
							</Box>

							{/* Search */}
							<Input
								placeholder="ค้นหา (ข้อความ / เป้าหมาย / ID)"
								value={query}
								onChangeText={setQuery}
								bg={cardBgColor}
								borderColor={borderColor}
								InputLeftElement={<Icon as={MaterialIcons} name="search" size="sm" color={subtitleColor} ml={2} />}
							/>

							{/* Error */}
							{error ? (
								<Box bg="red.50" borderWidth={1} borderColor="red.200" p={3} rounded="md">
									<HStack alignItems="center" justifyContent="space-between">
										<Text color="red.600">{String(error)}</Text>
										<Pressable onPress={fetchData} _pressed={{ opacity: 0.7 }}>
											<HStack space={1} alignItems="center">
												<Icon as={MaterialIcons} name="refresh" size="sm" color="red.600" />
												<Text color="red.600">ลองใหม่</Text>
											</HStack>
										</Pressable>
									</HStack>
								</Box>
							) : null}
						</VStack>
					)}
					ListEmptyComponent={(
						<Box alignItems="center" justifyContent="center" py={16}>
							<Icon as={MaterialIcons} name="inbox" size="xl" color={subtitleColor} />
							<Text mt={2} color={subtitleColor}>ไม่พบข้อมูล</Text>
						</Box>
					)}
					contentContainerStyle={{ paddingBottom: 24 }}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					keyboardShouldPersistTaps="handled"
				/>
			</Box>
		</Box>
	);
};

export default PromptsLibraryScreen; 