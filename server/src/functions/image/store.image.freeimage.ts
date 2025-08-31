import axios from "axios";

const StoreImageInFreeImage=async (image:Buffer)=>{
    const API_KEY = '6d207e02198a847aa98d0a2a901485a5';
    const API_URL = 'https://freeimage.host/api/1/upload';


    try{
        const imageBase64=image.toString('base64');
        
        const params = new URLSearchParams();
        params.append('key', API_KEY);
        params.append('action', 'upload');
        params.append('source', imageBase64);
        params.append('format', 'json');

        const response = await axios.post(API_URL, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            timeout: 30000 
        });

        if (response.data.status_code !== 200 || !response.data.success) {
          throw {state:400, message:`Upload failed`};
        }

        if (!response.data.image?.url) {
            throw {state:400,message:`No image URL returned from API`};
        }
        return response.data.image.url;

    }
    catch(e){throw e}
} 

export {StoreImageInFreeImage}