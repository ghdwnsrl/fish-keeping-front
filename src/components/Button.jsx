
function Button({ styleType, block, ...rest}) {
    let className = "rounded-lg border p-1 font-semibold hover:bg-gray-50";

    if (styleType) className += ` ${styleType}`;
    if (block) className += " block"

    return <button {...rest} className={className} />
}

export default Button;