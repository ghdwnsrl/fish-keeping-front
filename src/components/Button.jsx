
function Button({ styleType, block, ...rest}) {
    let className = "rounded-lg border p-1 font-semibold hover:bg-gray-50 disabled:bg-gray-200 disabled:text-white";
    if (styleType) className += ` ${styleType}`;
    if (block) className += " block"
    return <button {...rest} className={className} />
}

export default Button;