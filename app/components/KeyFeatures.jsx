export function KeyFeatures({features}) {
  return (
    <div className="key-features-section">
        {features && features.map((feature, index) => (
        <span className="key-feature" key={index}>
            <span className="key-feature-icon">
                <img src={feature.icon} />
            </span>
            <p className="key-feature-text">
                {feature.text}
            </p>
        </span> ))}
    </div>
  )
}
