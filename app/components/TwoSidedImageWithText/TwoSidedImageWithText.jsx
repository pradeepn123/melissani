
export function TwoSidedImageWithText({ twoSidedContent, className }) {
  return <section className={`w-full gap-4 md:gap-0 lg:gap-0 items-center ${className && className}`}>
    {twoSidedContent && <>
      {twoSidedContent.map((content, index) => (
        <div className="individual-side-content" key={index}>
            <h2 className="content-title">{content.title}</h2>
            <img className="content-desktop-image" src={content.desktopImage} />
            <img className="content-mobile-image" src={content.mobileImage} />
        </div>
      ))}
      </>}
  </section>
}
