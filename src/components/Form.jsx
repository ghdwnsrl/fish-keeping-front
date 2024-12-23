function Form({children, title, handleSubmit, styleType}) {
    return (
        <form noValidate className={styleType}
              onSubmit={handleSubmit}
        >
            {title && <p className='text-2xl font-semibold mb-5'>{title}</p>}
            {children}
        </form>
    )
}

export default Form;