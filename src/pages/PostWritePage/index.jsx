import 'react-quill/dist/quill.snow.css';
import {createPost} from "../../api/posts.js";
import useQuillImageReplacement from "../../hooks/useQuillImageReplacement.js";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import Title from "../../components/Title.jsx";
import PostEditor from "../../components/PostEditor.jsx";

const PostWritePage = () => {
    const {replaceImages} = useQuillImageReplacement();
    const navigate = useNavigate()

    const {mutate: create} = useMutation({
        mutationFn: createPost,
        onSuccess: (response) => {
            const id = response.data
            navigate(`/${id}`)
        }
    })

    const handleSubmit = async ( title, content, selected, initContent, prevThumbnailUrl) => {
        const {endContent: updatedContent, datas, thumbnailUrl} = await replaceImages(content, initContent, prevThumbnailUrl);
        console.log(updatedContent, datas, thumbnailUrl)
        const imgUrls = datas?.map(d => ({url: d.url}));
        console.log(imgUrls)
        create({title, content: updatedContent, selected, urlArray: imgUrls, thumbnailUrl: thumbnailUrl})
    }

    return (
        <div className='container'>
            <Title styleType='font-semibold text-2xl mb-2'>글쓰기</Title>
            <PostEditor handleSubmit={handleSubmit}/>
        </div>
    )
}

export default PostWritePage;