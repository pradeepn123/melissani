
export function TwoSidedImageWithText({ twoSidedContent, className }) {
  return <section className={`w-full gap-4 md:gap-8 items-center ${className && className}`}>
    {twoSidedContent && <>
      {console.log("twoSidedContent", twoSidedContent)}
      {twoSidedContent.map((content, index) => (
        <div className="individual-side-content" key={index}>
            <h2 className="content-title">{content.title}</h2>
            <img src={content.image} />
        </div>
      ))}
      </>}
  </section>
}
