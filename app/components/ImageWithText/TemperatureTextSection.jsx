export function TemperatureTextSection({data}) {
    return (
        <>
            <div className="text-section">
                <div className="warrentyIcon_section md:hidden block">
                    <img src={data.warrenty_icon} alt="" />
                </div>
                <h2 className="text-section-heading text-section-title">
                    {data.title}
                </h2>
                <p className="text-section-description font-tertiary">
                    {data.description}
                </p>
                
                <div className="text-section-icons">
                {data.iconWithText.map((item, index) => (
                    <div className="text-section-icon" key={index}>
                        <img src={item.icon} />
                        <div className="text-section-icon-text font-tertiary">
                            {item.text}
                        </div>
                    </div>))}
                </div>
            </div>
            <div className="warrentyIcon_section hidden md:block">
                <img src={data.warrenty_icon} alt="" />
            </div>
        </>
    )
}