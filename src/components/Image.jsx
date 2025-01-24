
const Image = ({ src, alt, className = "" }) => {
    return (
        <img
            alt={alt}
            src={src}
            className={`m-auto w-52 h-52 bg-gray-100 rounded-full ${className}`}
        />
    );
};

export default Image;