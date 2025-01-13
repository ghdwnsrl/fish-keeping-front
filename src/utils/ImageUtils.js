import Resizer from "react-image-file-resizer";

const ImageUtils = {
    resizeFile(file) {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                150,
                150,
                "JPEG",
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

    transBase64ToFileList(files) {
        return files.map((i) => {
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
        });
    }
}

export default ImageUtils;