import {useMutation} from "@tanstack/react-query";
import {getPreSignedURL, upload} from "../api/image.js";

export default function useImageUpload() {

    const { mutateAsync : getPreSignedUrl } = useMutation({
        mutationFn: getPreSignedURL
    })

    const { mutateAsync : uploadImageS3 } = useMutation({
        mutationFn: upload,
        onSuccess: () => {
            console.log('이미지 업로드 완료')
        }
    })

    // {image name, preSignedUrl} 반환
    const uploadImage = async (files) => {
        const fileArray =  files instanceof File ? [files] : files
        const filenames = files instanceof File ? [{fileName: files.name}] : Array.from(files).map(f => { return { fileName : f.name }})
        const preSignedUrls = await getPreSignedUrl({ filenames })
        const urlFilePairs = preSignedUrls.map((presignedURL, index) => {
            const url = presignedURL.split("?")[0]
            return {
                presignedURL : url,
                file: fileArray[index],
                filename: filenames[index].fileName,
            }
        });
        console.log('urlFilePairs', urlFilePairs)
        const uploadPromises = preSignedUrls.map((presignedURL, index) => {
            console.log(presignedURL, fileArray[index])
            return uploadImageS3({ presignedURL, file: fileArray[index] });
        });

        await Promise.all(uploadPromises);
        const datas = urlFilePairs.map(({ presignedURL, filename }) => ({ url : presignedURL, filename }));
        console.log(datas)
        return { datas }
    }

    return {
        uploadImage
    }
}