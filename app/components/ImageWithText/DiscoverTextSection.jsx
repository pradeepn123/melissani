export function DiscoverTextSection({discover}) {
    return (
        <div className="discover-section">
            <h2 className="discover-heading">
                {discover.title}
            </h2>
            <p className="discover-description font-tertiary">
                {discover.description}
            </p>
            
            <div className="discover-icons">
            {discover.iconWithText.map((item, index) => (
                <div className="discover-icon" key={index}>
                    <img src={item.icon} />
                    <div className="discover-icon-text font-tertiary">
                        {item.text}
                    </div>
                </div>))}
            </div>
        </div>
    )
}