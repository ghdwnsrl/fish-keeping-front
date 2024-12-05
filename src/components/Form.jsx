function Form({children, title, handleSubmit}) {
    return (
        <form className='container flex flex-col h-56 items-center justify-center mt-36 gap-2'
              onSubmit={handleSubmit}
        >
            <p className='text-2xl font-semibold mb-5'>{title}</p>
            {children}
        </form>
    )
}

export default Form;