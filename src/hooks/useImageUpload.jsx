import {useMutation} from "@tanstack/react-query";
import {getPreSignedURL, upload} from "../api/image.js";

export default function useImageUpload() {

    const { mutateAsync : getPreSignedUrl } = useMutation({
        mutationFn: getPreSignedURL
    })

    const { mutateAsync : uploadImageS3 } = useMutation({
        mutationFn: upload
    })

    const uploadImage = async (files) => {
        const filenames = Array.from(files).map(f => {
            console.log(f)
            return { fileName : f.name }
        })
        const preSignedUrls = await getPreSignedUrl({filenames})
        console.log(preSignedUrls)

        const uploadPromises = preSignedUrls.map((presignedURL, index) => {
            return uploadImageS3({ presignedURL, file: files[index] });
        });

        const results = await Promise.all(uploadPromises);
        console.log(results)
        return preSignedUrls;
    }

    return {
        uploadImage
    }
}
