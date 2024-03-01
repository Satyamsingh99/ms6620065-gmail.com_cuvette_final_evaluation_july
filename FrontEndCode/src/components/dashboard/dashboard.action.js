import axios from 'axios';

export const handleGetData = async (setGetAllData, selectedOption, user) => {
    //get data and set it setDataForToDoCard
    try {
        const temp = await axios.post("http://localhost:9002/get-data", { selectedOption, user })
        setGetAllData(temp.data)
        return temp.data;
    } catch (error) {
        console.error('Error:', error.response.data.error);
    }
};

export const handleSaveToChangeStatus = async (itemdata, setGetAllData, selectedOption, user) => {
    try {
        await axios.post("http://localhost:9002/update-card", { itemdata })
        alert('Task updated successfully');
        handleGetData(setGetAllData, selectedOption, user)
    } catch (error) {
        console.error('Error updating password:', error.response.data.error);
        alert('Error updating password:' + error.response.data.error);
    }

};

export const handleCardDelete = async (id, setGetAllData) => {
    try {
        await axios.post("http://localhost:9002/delete-card", { id })
        alert('Task deleted successfully');
        handleGetData(setGetAllData)
    } catch (error) {
        console.error('Error deleting card:', error.response.data.error);
        alert('Error deleting card:' + error.response.data.error);
    }
}