//This help with addresses and states
import { toast } from 'react-toastify';
import axios from 'axios';

interface IAddAddress {
    address: string,
    state?: string,
    zip?: string,
    postId: number
}

interface IAddState {
    postId: string,
    stateId: string
}

interface IState {
    ID: number,
    state_name: string,
    state_abbrev: string
}

const AddAddressAsync = async (data: IAddAddress) => {
    console.log(data);
    const result = await axios.post(`/api/addAddress`, data);
}

const AddStateAsync = async (data: IAddState) => {
    const result = await axios.post('/api/addState', data);
}

const GetAllStatesAsync = async (): Promise<IState[]> => {
    const result = await axios.get<any>(`/api/getAllStates`);
    if (result.data) {
        console.log(result.data.result);
        return result.data.result;
    }
    return [];
}

const SaveAddressAndState = async (postId: number, address?: string, stateId?: string) => {
    //Save the address if there is one
    if (address) {
        try {
            await AddAddressAsync({
                postId: postId,
                address: address,
            });
        }
        catch (ex) {
            console.error(ex);
            toast.error('Failed to save address!');
        }
    }

    //Save the state if there is one
    if (stateId) {
        try {
            await AddStateAsync({
                postId: postId.toString(),
                stateId: stateId
            });
        }
        catch (ex) {
            console.error(ex);
            toast.error('Failed to save state!');
        }
    }
}

export {
    AddAddressAsync,
    AddStateAsync,
    GetAllStatesAsync,
    SaveAddressAndState,
    type IState
}