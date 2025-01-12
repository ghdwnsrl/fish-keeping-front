import useApiRequest from "./useApiRequest.js";
import {deleteImage, getPreSignedURL, upload} from "../api/image.js";
import ImageUtils from "../utils/ImageUtils.js";


export default function useQuillImageReplacement() {
    const {execute: imageUpload }  = useApiRequest(upload);
    const {execute: imageRemove} = useApiRequest(deleteImage)
    const {execute: getPreSignedUrl }  = useApiRequest(getPreSignedURL);

    const getSrcData = (content) => {
        const srcArray= [];
        const gainSource = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;
        let idx = 0;
        while (gainSource.test(content)) {
            const result = RegExp.$2;
            srcArray.push({src:result, fileName: `image-${idx++}.jpg`});
        }
        return srcArray
    }

    /*
        -> 초기 이미지 없고, 새로운 썸네일을 저장해야하는 경우. (작성하는 경우)
        -> 초기 이미지 있고, 새로운 썸네일을 저장해야하는 경우. (수정하는 경우)
     */
    const getThumbnail = async (initImg, newFirstImg, preThumbnailUrl = '') => {
        console.log(initImg)
        console.log(newFirstImg)
        // 수정하는 경우 :
        if (initImg && newFirstImg) { // 2.수정하는 경우
            if ((Object.entries(initImg).toString() === Object.entries(newFirstImg).toString())) {
                return preThumbnailUrl
            }
            imageRemove({fileName: preThumbnailUrl}, {
                onSuccess: () => {
                    console.log('더이상 사용하지 않는 썸네일 이미지 삭제 완료')
                }
            })
        }
        let thumbnailUrl;
        await getPreSignedUrl({files : [{fileName: "thumbnail.jpg"}]}, {
            onSuccess: (response) => {
                console.log('성공')
                thumbnailUrl = response.data[0].split("?")[0]
                console.log(thumbnailUrl)
            }
        })
        const file = ImageUtils.transBase64ToFile(newFirstImg);
        const resizedFile = await ImageUtils.resizeFile(file)
        await imageUpload({presignedURL: thumbnailUrl, file: resizedFile, contentType: newFirstImg.contentType}, {
            onSuccess : () => {
                console.log('thumbnailUrl',thumbnailUrl)
                console.log('resized 된 이미지 전송 완료..')
            }
        })
        return thumbnailUrl
    }

    function isArrayEmpty(arr) {
        return Array.isArray(arr) && arr.length === 0;
    }

    const replaceImages = async (content, initContent = '', prevThumbnailUrl) => {
        let endContent = content;

        //// 추가된 이미지 처리
        const prev = getSrcData(initContent)
        const current = getSrcData(content)

        if (isArrayEmpty(prev) && isArrayEmpty(current)) {
            return {
                endContent: content,
                imgUrl: [],
                thumbnailUrl : 'https://via.placeholder.com/150'
            };
        }

        const thumbnailUrl =  await getThumbnail(prev[0], current[0], prevThumbnailUrl);

        console.log('prev', prev)
        console.log('current',current)

        const commonElements = prev.map(value => value["src"]).filter(value => current.some(obj => obj["src"] === value));
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
        console.log('files',files)
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
            const file = ImageUtils.transBase64ToFile(i);
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
        return {endContent, imgUrl, thumbnailUrl};
    };
    return { replaceImages };
};