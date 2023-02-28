export function DiscoverTextSection({discover}) {
    const discoverTitle = discover?.title.split(" ");
    return (
        <div className="discover-section">
            <h2 className="discover-heading">
            {discoverTitle && discoverTitle.map((item, index) => (
                <span className={`discover-title ${item.includes('M1') ? "italic-discover-title" : ""}`} key={index}>
                    {item + " "}
                </span>
            ))}
            </h2>
            <p className="discover-description">
                {discover.description}
            </p>
            
            <div className="discover-icons">
            {discover.iconWithText.map((item, index) => (
                <div className="discover-icon" key={index}>
                    <img src={item.icon} />
                    <div className="discover-icon-text">
                        {item.text}
                    </div>
                </div>))}
            </div>
        </div>
    )
}