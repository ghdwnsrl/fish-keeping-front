import 'react-quill/dist/quill.snow.css';
import {createPost} from "../../api/posts.js";
import useQuillImageReplacement from "../../hooks/useQuillImageReplacement.js";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import Title from "../../components/Title.jsx";
import PostEditor from "../../components/PostEditor.jsx";
i
const PostWritePage = () => {
    const {replaceImages} = useQuillImageReplacement();
    const navigate = useNavigate()

    const {mutate: create, isPending} = useMutation({
        mutationFn: createPost,
        onSuccess: (response) => {
            const id = response.data
            navigate(`/${id}`)
        },
        onError : error => {
            console.log(error)
        }
    })

    const handleSubmit = async ( title, content, selected, initContent, prevThumbnailUrl) => {
        const {endContent: updatedContent, datas, thumbnailUrl} = await replaceImages(content, initContent, prevThumbnailUrl);
        const imgUrls = datas?.map(d => ({url: d.url, imageType: "CONTENT"}));
        imgUrls?.push({url : thumbnailUrl, imageType: "THUMBNAIL"})
        create({title, content: updatedContent, selected, urlArray: imgUrls})
    }

    return (
        <div className='container'>
            <Title styleType='font-semibold text-2xl mb-2'>글쓰기</Title>
            <PostEditor
                onSubmit={handleSubmit}
                isPending={isPending}
            />
        </div>
    )
}

export default PostWritePage;