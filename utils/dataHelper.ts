//This help with addresses and states
import axios from 'axios';

interface IAddAddress {
    address: string,
    state?: string,
    zip?: string,
    postId: number
}

const AddAddressAsync = async (data: IAddAddress) => {
    console.log(data);
    const result = await axios.post(`/api/addAddress`, data);
}

export {
    AddAddressAsync
}