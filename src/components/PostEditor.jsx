import {FaBox} from "react-icons/fa";
import ComboBox from "./ComboBox.jsx";
import ReactQuill from "react-quill";
import Button from "./Button.jsx";
import {useMemo, useState} from "react";

const PostEditor = ({initTitle = '', initContent = '', initSelected = '선택 안함', handleSubmit}) => {
    const [content, setContent] = useState(initContent);
    const [title, setTitle] = useState(initTitle);
    const [selected, setSelected] = useState(initSelected)

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ["image"],
                [{header: [1, 2, 3, 4, 5, false]}],
                ["bold", "underline"]
            ]
        },
    }), []);

    const onHandleSubmit = (e) => {
        e.preventDefault()
        handleSubmit(title, content, selected, initContent);
    }

    return (
        <form onSubmit={onHandleSubmit}>
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
                <Button
                    styleType='rounded w-16 shadow-sm h-8'
                    type="submit"
                >작성</Button>
            </div>
        </form>
    )
}

export default PostEditor;