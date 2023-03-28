export function VolumeTextSection({data}) {
    return (
        <div className="text-section" id="volume-control-section" data-aos="fade-up">
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
    )
}