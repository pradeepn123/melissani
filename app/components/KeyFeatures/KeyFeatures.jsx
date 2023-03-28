export function KeyFeatures({features}) {  
  return (
    <div className="key-features-section">
        {features && features.map((feature, index) => (
        <span className="key-feature" data-aos='fade-up' key={index}>
            <span className="key-feature-icon">
                <img src={feature.icon} />
            </span>
            <p className="key-feature-text font-tertiary">
                {feature.text}
            </p>
        </span> ))}
    </div>
  )
}
