import Button from "../../components/Button.jsx";

const IntroTextEditButton = ({isEditing, onEditIntroTextHandler}) => {
    if (isEditing) return ;
    return <Button styleType='w-full'
                   onClick={onEditIntroTextHandler}>
        한줄 소개 수정
    </Button>
}

export default IntroTextEditButton;