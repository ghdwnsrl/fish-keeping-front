import {FaBox} from "react-icons/fa";
import ArchiveDialog from "./ArchiveDialog.jsx";
import ReactQuill from "react-quill";
import Button from "./Button.jsx";
import {useMemo, useState} from "react";

const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size',
    'h1',
    'image'
];

const PostEditor = ({initTitle = '', initContent = '', initSelected = '선택 안함', handleSubmit}) => {
    const [content, setContent] = useState(initContent);
    const [title, setTitle] = useState(initTitle);
    const [selected, setSelected] = useState(initSelected)

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ align: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ["image"],
                [{header: [1, 2, 3, 4, 5, false]}],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [], }, { background: [] },],
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
                    <ArchiveDialog selected={selected} setSelected={setSelected}/>
                </div>
            </div>
            <ReactQuill
                theme="snow"
                modules={modules}
                value={content}
                formats={formats}
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