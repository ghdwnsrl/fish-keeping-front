import {FaBox} from "react-icons/fa";
import ArchiveDialog from "./ArchiveDialog.jsx";
import ReactQuill, {Quill} from "react-quill";
import Button from "./Button.jsx";
import {useMemo} from "react";
import Form from "./Form.jsx";
import {useForm} from "react-hook-form";
import {ImageActions} from "@xeger/quill-image-actions";
import {ImageFormats} from "@xeger/quill-image-formats";

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
    'image',
    'float',
    'height',
    'width',
];

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

const PostEditor = ({initTitle = '', initContent = '', initSelected = '선택 안함', onSubmit }) => {
    const {register, handleSubmit, setValue, watch
    } = useForm({defaultValues: {
            title : initTitle,
            content: initContent,
            selected: initSelected
        }})

    const content = watch("content", initContent);

    const modules = useMemo(() => ({
        imageActions: {},
        imageFormats: {},
        toolbar: {
            container: [
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ align: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ["image"],
                [{header: [1, 2, 3, 4, 5, false]}],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [], }, { background: [] },],
            ],
            ImageResize: {
                modules: ['Resize'],
            },
        },
    }), []);

    const handleEditorChange = (value) => {
        setValue("content", value); // content 값을 업데이트
    };

    const onHandleSubmit = (value) => {
        const {title, content, selected} = value
        onSubmit(title, content, selected, initContent);
    }

    return (
        <Form handleSubmit={handleSubmit(onHandleSubmit)}>
            <div className='flex w-full h-10 pl-3 border-gray-150 border-x border-t'>
                <input className='focus:outline-none flex-grow'
                       {...register("title", {required : "제목은 필수입니다."})} />
                <div className='flex items-center border-gray-150 gap-2 border-l pl-2'>
                    <FaBox/>
                    <ArchiveDialog watch={watch} setValue={setValue}/>
                </div>
            </div>
            <ReactQuill
                theme="snow"
                modules={modules}
                value={content}
                formats={formats}
                onChange={handleEditorChange}
            />
            <div className='flex gap-2 items-center justify-end pt-2 '>
                <Button
                    styleType='rounded w-16 shadow-sm h-8'
                    type="submit"
                >작성</Button>
            </div>
        </Form>
    )
}

export default PostEditor;