const Card = ({ image, title, summary, customStyle, imageCustomStyle }) => {
    return (
        <div className={`border rounded-lg shadow-lg overflow-hidden ${customStyle}`}>
            {image && <img src={image} alt={title} className={`w-full ${imageCustomStyle} object-cover`} />}
            <div className="p-4">
                <h2 className="font-bold text-md sm:text-lg mb-2">{title}</h2>
                <p className="text-[12px] sm:text-sm text-gray-600">{summary}</p>
            </div>
        </div>
    );
};

export default Card;
