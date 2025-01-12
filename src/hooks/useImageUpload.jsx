import {useMutation} from "@tanstack/react-query";
import {getPreSignedURL, upload} from "../api/image.js";

export default function useImageUpload() {

    const { mutateAsync : getPreSignedUrl } = useMutation({
        mutationFn: getPreSignedURL
    })

    const { mutateAsync : uploadImageS3 } = useMutation({
        mutationFn: upload,
        onSuccess: () => {
            console.log('업로드 성공')
        }
    })

    const uploadImage = async (file) => {
        const fileName = file.name;
        const preSignedUrls = await getPreSignedUrl({files: [{fileName}]})
        for (const p of preSignedUrls) {
            console.log('서버 업로드')
            await uploadImageS3({presignedURL : p, file})
        }
        return preSignedUrls;
    }

    return {
        uploadImage
    }
}
