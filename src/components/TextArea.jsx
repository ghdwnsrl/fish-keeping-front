import {useRef, useState} from "react";
import Button from "./Button.jsx";

function TextArea({styleType, btValue = '작 성', initialContent = '', handleSubmit}) {
    const [content, setContent] = useState(initialContent.replace("\r\n", "<br>"))
    console.log(content)
    const textareaRef = useRef();
    return (
        <form className='grid' onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(content)
        }}>
            <textarea ref={textareaRef}
                      className={`h-20 border rounded-lg resize-none ${styleType}`}
                      onChange={(e) => {
                          const textarea = textareaRef.current;
                          textarea.style.height = "auto";
                          textarea.style.height = `${textarea.scrollHeight}px`;
                          setContent(e.target.value);
                      }}
                      value={content}
            />
            <Button type='submit' styleType="h-8 w-16 justify-self-end">{btValue}</Button>
        </form>
    )
}

export default TextArea;