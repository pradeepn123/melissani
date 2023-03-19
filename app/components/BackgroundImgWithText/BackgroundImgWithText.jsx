export function BackgroundImgWithText({filterreplacementcycle}){
    return(
        <>
            <section>
                <div className="background_image_section">
                    <div className="image_wrapper_section">
                        <img className="xl:block hidden w-full" src={filterreplacementcycle.image} alt="" />
                        <img className="block xl:hidden w-full" src={filterreplacementcycle.image_mobile} alt="" />
                    </div>
                    <div className="text_wrapper_section">
                        <div className="text_wrapper_section_inner">
                            <h2>{filterreplacementcycle.heading}</h2>
                            <p>{filterreplacementcycle.description}</p>
                            <ul className="block_icon_text__wrapper">
                                {(filterreplacementcycle?.items || []).map((item, index) => (
                                    <li key={`${index}`}>
                                        <img src={item.icon} alt="" />
                                        <h3>{item.text}</h3>
                                        <span className="month_label">{item.month_label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}