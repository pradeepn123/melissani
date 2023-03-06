export function TemperatureTextSection({data}) {
    return (
        <div className="text-section">
            <h2 className="text-section-heading text-section-title">
                {data.title}
            </h2>
            <p className="text-section-description">
                {data.description}
            </p>
            
            <div className="text-section-icons">
            {data.iconWithText.map((item, index) => (
                <div className="text-section-icon" key={index}>
                    <img src={item.icon} />
                    <div className="text-section-icon-text">
                        {item.text}
                    </div>
                </div>))}
            </div>
        </div>
    )
}