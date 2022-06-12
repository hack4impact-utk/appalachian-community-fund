import axios from "axios";
import { AdminFilesAddData } from "./adminInterfaces";
import { categoryStruct, tagStruct } from "./interfaces";
import { WP_Media, WP_Post } from "./wordpressInterfaces";
import { GetAuth } from "../lib/auth";

interface IFile {
    file: any,
    fileName: string
}

const handleUpload = async (newFileData: IFile): Promise<WP_Media | null> => {
    //This just uploads a file as a media item and returns it to you
    console.log(newFileData);

    const authInfo = GetAuth(); //TODO: Swap this out with the current logged in user's info
    console.log(authInfo);

    //Now we post the media item
    try {
        const formData = new FormData();
        formData.append('file', newFileData.file);

        //We can append the arguments listed in the wordpress rest api here
        formData.append('title', newFileData.fileName);
        formData.append('description', newFileData.fileName);
        formData.append('status', 'publish');
        //formData.append('post', associatedPost.id.toString());

        const mediaItem: WP_Media = (await axios.post<FormData, any>(`/wpapi/?rest_route=/wp/v2/media`, formData, {
            headers: {
                'Content-Disposition': `form-data; filename='${newFileData.fileName}'`,
                'Authorization': authInfo
            }
        })).data;
        console.log(mediaItem);

        return mediaItem;
    }
    catch (ex) {
        console.warn(ex);
        return null;
    }
}

export { handleUpload, type IFile };