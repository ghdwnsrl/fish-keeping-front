import ReactQuill from "react-quill";
import {useMemo, useState} from "react";
import 'react-quill/dist/quill.snow.css';
import {createPost, updatePost} from "../../api/posts.js";
import useQuillImageReplacement from "../../hooks/useQuillImageReplacement.js";
import {useNavigate} from "react-router-dom";
import ComboBox from "../../components/ComboBox.jsx";
import {FaBox} from "react-icons/fa";
import {useMutation} from "@tanstack/react-query";

const PostWritePage = ({type = '글쓰기',initTitle = '', initContent = '', initSelected = '선택 안함', prevThumbnailUrl, isEdit = false, id}) => {
    const [content, setContent] = useState(initContent);
    const [title, setTitle] = useState(initTitle);
    const [selected, setSelected] = useState(initSelected)
    const {replaceImages} = useQuillImageReplacement();
    const navigate = useNavigate()

    const {mutate: create} = useMutation({
        mutationFn: createPost,
        onSuccess: (response) => {
            const id = response.data
            navigate(`/${id}`)
        }
    })

    const {mutate: update} = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            console.log('업데이트 성공')
            navigate(`/${id}`)
        }
    })

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ["image"],
                [{header: [1, 2, 3, 4, 5, false]}],
                ["bold", "underline"]
            ]
        },
    }), []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {endContent: updatedContent, imgUrl, thumbnailUrl} = await replaceImages(content, initContent, prevThumbnailUrl);

        if (isEdit) {
            update({id: id, title, content: updatedContent, selected, urlArray: imgUrl, thumbnailUrl: thumbnailUrl})
        } else {
            create({title, content: updatedContent, selected, urlArray: imgUrl, thumbnailUrl: thumbnailUrl})
        }
    }

    return (
        <div className='container'>
            <h1 className='font-semibold text-2xl mb-2'>{type}</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex w-full h-10 pl-3 border-gray-150 border-x border-t'>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        placeholder="제목"
                        className='focus:outline-none flex-grow'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className='flex items-center border-gray-150 gap-2 border-l pl-2'>
                        <FaBox/>
                        <ComboBox selected={selected} setSelected={setSelected}/>
                    </div>
                </div>
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={content}
                    onChange={setContent}
                />
                <div className='flex gap-2 items-center justify-end pt-2 '>
                    <button
                        className="border rounded w-16 shadow-sm font-semibold h-8 hover:bg-gray-50"
                        type="submit">작성
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PostWritePage;