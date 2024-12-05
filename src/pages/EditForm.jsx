import {useLocation} from "react-router-dom";
import WriteForm from "./WriteForm.jsx";

function EditForm() {
    const { state } =  useLocation();
    const {type, initTitle, initContent, id} = state;
    return (
        <WriteForm type={type} initTitle={initTitle} initContent={initContent} isEdit={true} id={id}/>
    )
}

export default EditForm;