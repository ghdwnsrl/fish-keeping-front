import Resizer from "react-image-file-resizer";

const ImageUtils = {
    resizeFile(file) {
        console.log(typeof file)
        console.log(file)
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "WEBP",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        })
    },

    transBase64ToFile(i) {
        const byteString = atob(i.src.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ia], {
            type: "image/jpeg"
        });
        return new File([blob], i.fileName);
    },

    async transUrlToFile(url) {
        const response = await fetch(url);
        const data = await response.blob();
        const ext = url.split(".").pop();
        const filename = url.split("/").pop();
        const metadata = { type: `image/${ext}` };
        return new File([data], filename, metadata)
    },

    transBase64ToFileList(files) {
        return files.map((i) => {
            return this.transBase64ToFile(i)
        });
    }
}

export default ImageUtils;