import {useLocation, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {updatePost} from "../../api/posts.js";
import useQuillImageReplacement from "../../hooks/useQuillImageReplacement.js";
import PostEditor from "../../components/PostEditor.jsx";
import Title from "../../components/Title.jsx";

const PostEditPage = () => {
    const {state} = useLocation();
    const {replaceImages} = useQuillImageReplacement();
    const navigate = useNavigate();
    const { initTitle, initContent, id, prevThumbnailUrl} = state;

    const {mutate: update, isPending} = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            navigate(`/${id}`)
        }
    })

    const handleSubmit = async (title, content, selected, initContent, prevThumbnailUrl) => {
        const {endContent: updatedContent, datas, thumbnailUrl} = await replaceImages(content, initContent, prevThumbnailUrl);
        const imgUrls = datas?.map(d => ({url: d.url, imageType: "CONTENT"}));
        if (thumbnailUrl && imgUrls) {
            imgUrls.push({url : thumbnailUrl, imageType: "THUMBNAIL"})
        }
        update({id: id, title, content: updatedContent, selected, urlArray: imgUrls})
    }

    return <div className='container'>
        <Title styleType='font-semibold text-2xl mb-2'>수정</Title>
        <PostEditor
            initTitle={initTitle}
            initContent={initContent}
            prevThumbnailUrl={prevThumbnailUrl}
            id={id}
            onSubmit={handleSubmit}
            isPending={isPending}
        />
    </div>
}

export default PostEditPage;