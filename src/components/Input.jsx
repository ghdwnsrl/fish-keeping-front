function InputWithIcon({children, label, name, placeholder, type = 'text', value, onChange}) {
    return (
        <div className="w-96 flex items-center border border-gray-300 rounded-lg p-2">
            {children}
            <input
                label={label}
                name={name}
                type={type}
                placeholder={placeholder}
                className="outline-none"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default InputWithIcon;