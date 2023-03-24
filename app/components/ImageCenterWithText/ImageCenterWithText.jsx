export function ImageCenterWithText({ installation, installationHeadingClassName, installationParaClassName }) {
    return (
        <section>
            <div className="desktop-convenience-section w-full">
                <img src={installation.desktopImg} />
            </div>
            <div className="relative mobile-convenience-section">
                <img className="relative top-0 -left-0 w-full" src={installation.img} />
                <h2
                    className={`md:absolute text-black font-bold sm:text-2xl lg:text-4xl xl:text-5xl top-1/2 lg:max-w-sm md:p-3 sm:text-center sm:p-3 lg:pt-0 ${installationHeadingClassName}`}>
                    {installation.header}
                </h2>
                <p
                    className={`md:absolute text-black font-normal sm:text-base xl:text-2xl lg:text-base top-1/2 left-1/2 lg:max-w-xs xl:max-w-sm sm:p-5 sm:pt-0 ${installationParaClassName}`}>
                    {installation.paragraph}
                </p>
            </div>
        </section>
    )
}
