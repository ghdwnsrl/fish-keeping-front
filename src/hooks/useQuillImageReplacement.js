import {deleteImage} from "../api/image.js";
import ImageUtils from "../utils/ImageUtils.js";
import imageUtils from "../utils/ImageUtils.js";
import useImageUpload from "./useImageUpload.jsx";
import {useMutation} from "@tanstack/react-query";

export default function useQuillImageReplacement() {
    const { uploadImage } = useImageUpload();

    const {mutate : imageRemove} = useMutation({
        mutationFn: deleteImage,
        onSuccess: () => {
            console.log('이미지 삭제 완료')
        }
    })

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

    function isArrayEmpty(arr) {
        return Array.isArray(arr) && arr.length === 0;
    }

    const getThumbnail = async (initImg, newFirstImg, preThumbnailUrl = '') => {
        // 수정하는 경우
        if (initImg && newFirstImg) {
            if ((Object.entries(initImg).toString() === Object.entries(newFirstImg).toString())) {
                return
            }
            imageRemove({fileName: preThumbnailUrl.match(/([^/]+\.[^.]+)$/)[0]})
        }
        if (newFirstImg.src.startsWith('https')) {
            return  await imageUtils.transUrlToFile(newFirstImg.src)
                .then(async file => {
                    const resizedFile = await ImageUtils.resizeFile(file)
                    const {datas} = await uploadImage(resizedFile)
                    console.log(datas)
                    return datas[0].url
                })
                .catch((error) => {
                    console.error('오류 발생', error)
                })
        }
        const file = ImageUtils.transBase64ToFile(newFirstImg);
        const resizedFile = await ImageUtils.resizeFile(file)
        console.log(resizedFile)
        const { datas } = await uploadImage(resizedFile)
        console.log(datas[0].url)
        return datas[0].url
    }

    const replaceImages = async (content, initContent = '', prevThumbnailUrl) => {

        let endContent = content;

        const prev = getSrcData(initContent)
        const current = getSrcData(content)

        if (isArrayEmpty(prev) && isArrayEmpty(current)) {
            return {
                endContent: content,
                imgUrl: [],
                thumbnailUrl : 'https://placehold.co/240x240?text=NO%20IMAGE'
            };
        }

        const thumbnailUrl =  await getThumbnail(prev[0], current[0], prevThumbnailUrl);
        console.log('here',thumbnailUrl)
        // 공통 이미지를 추출
        const commonElements = prev.map(value => value["src"]).filter(value => current.some(obj => obj["src"] === value));

        // 이전 이미지들에서 중복 이미지 삭제
        const filteredPrev = prev.filter(value => !commonElements.includes(value["src"]));

        // 현재 이미지들에서 중복 이미지 삭제
        const filteredCurrent = current.filter(value => !commonElements.includes(value["src"]));
        const filteredCurrentMap = filteredCurrent.reduce((map, obj) => {
            map.set(obj.fileName, obj.src);
            return map;
        }, new Map);

        console.log(filteredCurrent)

        // 이전 이미지들 중 중복 제거 후 값이 남아 있는 경우는
        // 더 이상 사용하지 않는 이미지이기 때문에 서버로 삭제 요청을 한다.
        if (filteredPrev) {
            filteredPrev.forEach(i => {
                const storeImageName = i.src.match(/[^/]+\.jpg$/)
                imageRemove({fileName: storeImageName})
            })
        }

        const files = ImageUtils.transBase64ToFileList(filteredCurrent)
        const { datas } = await uploadImage(files)
        console.log(datas)
        datas.forEach(d => {
            const result = filteredCurrentMap.get(d.filename)
            endContent = endContent.replace(result, d.url)
        })
        datas.map((d => {
            return {d}
        }))
        console.log(endContent)
        return { endContent, datas, thumbnailUrl};
    }

    return { replaceImages };
};