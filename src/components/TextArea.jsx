import {useState} from "react";
import {useParams} from "react-router-dom";
import useApiRequest from "../hooks/useApiRequest.js";
import {createComment} from "../api/comment.js";

function TextArea() {
    const [content, setContent] = useState('')
    const {execute : create } = useApiRequest(createComment)
    const {id} = useParams()
    const handleSubmit = () => {
      create({postId : id, content}, {
          onSuccess: () => {
              console.log('성공')
          }
      })}
    return (
        <form className='flex flex-col items-center w-full' onSubmit={handleSubmit}>
            <textarea className='h-20 w-full border p-2 m-2 rounded-lg resize-none'
                      onChange={(e) => setContent(e.target.value)}
                      value={content}
            />
            <button className='border rounded-lg h-8 w-16 hover:bg-gray-50 '
                    type='submit'
            >작 성</button>
        </form>
    )
}

export default TextArea;