import {useLocation} from "react-router-dom";
import PostWritePage from "../PostWritePage/index.jsx";

const PostEditPage = () => {
    const { state } =  useLocation();
    const {type, initTitle, initContent, id, prevThumbnailUrl} = state;
    return <PostWritePage
        type={type}
        initTitle={initTitle}
        initContent={initContent}
        prevThumbnailUrl={prevThumbnailUrl}
        isEdit={true}
        id={id}
    />
}

export default PostEditPage;