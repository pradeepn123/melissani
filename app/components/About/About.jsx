export function About({data}) {
    return (
      <>
        <section className='main_about_us_section relative'>
            <div className="image_main_wrapper">
                <img className="w-full" src={data.image_url_desktop} alt=""/>
            </div>
            <div className="content_info_section mx-5 px-6 md:mx-10 md:px-8 lg:px-12">
                {(data?.about_info || []).map((block, index) => (
                    <div className={`about_us_content xl:absolute ${index % 2 == 0 ? 'left' : 'right'}`}>
                        <div key={`about-${index}`} className="about_us_content_inner">
                            <h2 className="uppercase font-bold pb-2">{block.heading}</h2>
                            <h4 className="pb-2">{block.sub_heading}</h4>
                            <p className="">{block.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </>
    );
}