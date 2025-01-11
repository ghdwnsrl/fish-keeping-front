
const Title = ({styleType, ...rest }) => {
    let className = "font-bold text-2xl";
    if (styleType) className += ` ${styleType}`;
    return <h1 {...rest} className={className}/>
}

export default Title;