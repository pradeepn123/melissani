export function About({data}) {
    return (
      <>
        <section className='main_about_us_section relative'>            
            <div className="content_info_section px-5 md:px-10" style={{backgroundImage: `url(${data.image_url_desktop})`}}>
                <div className="content_info_bg">
                    {(data?.about_info || []).map((block, index) => (
                        <div className={`about_us_content ${index % 2 == 0 ? 'left' : 'right'}`}>
                            <div key={`about-${index}`} className="about_us_content_inner">
                                <h2 className="font-primary uppercase font-bold pb-2">{block.heading}</h2>
                                <h4 className="font-secondary pb-2">{block.sub_heading}</h4>
                                <p className="font-tertiary">{block.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="image_main_wrapper h-full">
                <img className="w-full" src={data.image_url_desktop} alt=""/>
            </div> */}
        </section>
      </>
    );
}