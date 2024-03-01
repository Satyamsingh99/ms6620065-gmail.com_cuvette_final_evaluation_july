import axios from 'axios';
export const handleGetAnalyticsData = async (user, setAnalyticsData) => {
    try {
        let user1 = user.user
        const temp = await axios.post("http://localhost:9002/get-analytics-data", { user1 })
        setAnalyticsData(temp.data);
        return temp.data;
    } catch (error) {
        console.error('Error:', error.response.data.error);
    }
};