import useApiRequest from "./useApiRequest.js";
import {deleteImage, getPreSignedURL, upload} from "../api/image.js";


export default function useQuillImageReplacement() {
    const {execute: imageUpload }  = useApiRequest(upload);
    const {execute: imageRemove} = useApiRequest(deleteImage)
    const {execute: getPreSignedUrl }  = useApiRequest(getPreSignedURL);

    const getSrcData = (content) => {
        console.log(content)
        const srcArray= [];
        const gainSource = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;
        let idx = 0;
        while (gainSource.test(content)) {
            const result = RegExp.$2;
            srcArray.push({src:result, fileName: `image-${idx++}.jpg`});
        }
        return srcArray
    }

    // 지금은 content 전달 -> src 추출 -> 이미지 url 받고 s3로 전송.
    // 추가해야할 기능 content와 preContent 확인 후
    const replaceImages = async (content, initContent = '') => {
        let endContent = content;

        //// 추가된 이미지 처리
        const prev = getSrcData(initContent)
        const current = getSrcData(content)
        const commonElements = prev.map(value => value["src"]).filter(value => current.some(obj => obj["src"] === value));
        console.log('here',commonElements)
        const filteredPrev = prev.filter(value => !commonElements.includes(value["src"]));
        const filteredCurrent = current.filter(value => !commonElements.includes(value["src"]));

        if (filteredPrev) {
            filteredPrev.forEach(i => {
                const storeImageName = i.src.match(/[^/]+\.jpg$/)
                imageRemove({fileName: storeImageName}, {
                    onSuccess: () => {
                        console.log('더이상 사용하지 않는 이미지 삭제 완료')
                    }
                })
            })
        }
        const files = filteredCurrent.map(i => {
            return {fileName : i.fileName}
        })

        let images;
        await getPreSignedUrl({files: files}, {
            onSuccess: (response) => {
                images = filteredCurrent.map( (item, index) => {
                    return {
                        ...item,
                        presignedUrl: response.data[index]
                    }
                })
            }
        })

        const promises = images.map(async (i) => {
            const byteString = atob(i.src.split(",")[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ia], {
                type: "image/jpeg"
            });
            const file = new File([blob], i.fileName);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('Content-Type', file.type)
            let imgUrl;
            await imageUpload({presignedURL: i.presignedUrl, file: file, contentType: i.contentType}, {
                onSuccess : () => {
                    const imageUrl = i.presignedUrl.split("?")[0]
                    imgUrl = imageUrl
                    endContent = endContent.replace(i.src, imageUrl)
                    console.log(endContent)
                },
                onError : () => {
                    console.log('이미지 업로드 실패')
                }
            })
            return {url:imgUrl};
        })
        const imgUrl = await Promise.all(promises);
        return {endContent, imgUrl};
    };
    return { replaceImages, getSrcData };
};
