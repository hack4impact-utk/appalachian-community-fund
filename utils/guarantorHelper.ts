import axios from 'axios';
import { toast } from 'react-toastify';
import { WP_Post } from './wordpressInterfaces';
import { handleUpload } from './fileUploadHelper';
import { categoryStruct, tagStruct } from './interfaces';
import { GetAuth } from '../lib/auth';
import { IGuarantor } from  '../components/Admin/Guarantor/GuarantorMain';
import { AddAddressAsync, AddStateAsync, SaveAddressAndState } from './dataHelper';
import moment from 'moment';

interface ITemplate {
    title: string,
    description: string,
    tags: string[],
    categories: string[],
    phone: string | null,
    email: string | null,
    address: string | null,
    imageURL: string | null,
    website: string | null
}

const CreateContentString = (data: ITemplate): string => {
    //Turns the given data into a string to be used as the content property a post

    //https://acf.apph3.com/wp-content/uploads/2022/06/71nYpzVCL._SL1400_-2.jpg Sample Photo

    const template = `
    <div class=\"wp-block-media-text alignwide has-media-on-the-right is-stacked-on-mobile is-image-fill is-style-default\">
        <figure class=\"wp-block-media-text__media\" style=\"background-image:url(${data.imageURL});background-position:48% 5%\">
            <img loading=\"lazy\" width=\"364\" height=\"429\" src=\"${data.imageURL}\" alt=\"\" class=\"wp-image-137 size-full\" srcset=\"${data.imageURL} 364w, ${data.imageURL} 255w\" sizes=\"(max-width: 364px) 100vw, 364px\" />
        </figure>
        <div class=\"wp-block-media-text__content\">
            <h1 class=\"fonts-plugin-block\" style=\"font-family: Bitter;font-weight: 700;font-size: 30px\">${data.title}</h1>\n\n
            ${data.address ? `<p class=\"fonts-plugin-block\" style=\"font-family: Oswald;font-weight: 700;font-size: 24px\">${data.address}</p>\n\n` : ''}
            <p class=\"fonts-plugin-block\" style=\"font-family: Bitter;font-weight: 400;font-size: 18px\">${data.description}</p>\n\n
            ${data.tags.length ? `<p class=\"fonts-plugin-block\" style=\"font-weight: normal;font-size: 22px;color: #ad020d\">${data.tags.join(', ')}</p>` : ''}
            ${data.categories.length ? `<p class=\"fonts-plugin-block\" style=\"font-weight: normal;font-size: 22px;color: #ad020d\">${data.categories.join(', ')}</p>\n` : ''}
            <p class=\"fonts-plugin-block\" style=\"font-family: Bitter;font-weight: normal;font-size: 18px\">
                Contact Information:
                ${data.email ? (
                    `Email: ${data.email}`
                ) : ''}
                ${data.phone ? (
                    `Phone: ${data.phone}`
                ) : ''}
                ${data.website ? (
                    `Website: ${data.website}`
                ) : ''}
            </p>\n\n\n
            <p></p>\n
        </div>
    </div>\n\n\n\n<p></p>\n`;

    return template;
}

const CreateGuarantorPost = async (guarantorData: IGuarantor, selectedCategories: categoryStruct[], selectedTags: tagStruct[], image: any): Promise<boolean> => {
    const categoriesIDs: number[] = selectedCategories.map(x => x.id);
    const tagsIDs: number[] = selectedTags.map(x => x.id);
    const categoryNames: string[] = selectedCategories.map(x => x.name);
    const tagNames: string[] = selectedTags.map(x => x.name);

    //First we must create the media item that's on the page, if it has one
    const mediaItem = await handleUpload({ file: image, fileName: `${guarantorData.title} ${moment().toString()}` });

    if (!mediaItem) {
        toast.error('Failed to create post! Unable to save image');
        return;
    }

    //Then we can create the post
    const postPayload = {
        //'date': newFileData.articleDate.toDateString(),
        //date_gmt: newFileData.articleDate,
        //'slug': `${new Date}${newFileData.fileName}`,
        'status': 'publish',
        //password: '',
        'title': guarantorData.title,
        'content': CreateContentString({
            title: guarantorData.title,
            description: guarantorData.description,
            tags: tagNames,
            categories: categoryNames,
            phone: guarantorData.phone,
            email: guarantorData.email,
            address: guarantorData.address,
            imageURL: mediaItem.source_url,
            website: guarantorData.website
        }),
        //author: '0', //TODO: Swap this out with the current logged in user's ID
        'excerpt': guarantorData.shortDescription,
        //featured_media: '',
        //'comment_status': 'closed',
        //ping_status: 'close', //TODO: Find what this is for and set it correctly
        'format': 'standard',
        // meta: '',
        // sticky: '',
        // template: '',
        'categories': categoriesIDs.join(),
        'tags': tagsIDs.join()
    };
    const authInfo = GetAuth(); //TODO: Swap this out with the current logged in user's info
    console.log(postPayload);

    //Create our post
    try {
        const associatedPost: WP_Post = (await axios.post<string, any>('/wpapi/?rest_route=/wp/v2/posts', JSON.stringify(postPayload), { 
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': authInfo
            }
        })).data;

        console.log(associatedPost);
        toast.success('Guarantor Added!');

        await SaveAddressAndState(associatedPost.id, guarantorData.address, guarantorData.state.toString());

        return true;
    }
    catch (ex) {
        toast.error('Failed to create post!');
        console.warn(ex);
        return false;
    }
}

export { CreateContentString, CreateGuarantorPost };