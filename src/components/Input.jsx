function Input({children, placeholder, type = "text", register, name, condition}) {
    return (
        <div className="w-96 flex items-center border border-gray-300 rounded-lg p-2">
            {children}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                className="outline-none w-full"
                {...register(name, condition)}
            />
        </div>
    )
}

export default Input;