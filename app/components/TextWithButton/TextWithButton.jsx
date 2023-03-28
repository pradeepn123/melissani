export function TextWithButton({textwithbutton}) {
    return (
        <section data-aos="fade-up">
            <div className="text_with_button_info">
                <div className="mx-auto">
                    <div className="text_with_button_info_inner">
                        <h2 data-aos="fade-up"  data-aos-duration="1000">{textwithbutton.heading}</h2>
                        <h3 data-aos="fade-up"  data-aos-duration="1200">{textwithbutton.subheading}</h3>
                        <a href={textwithbutton.button_url} data-aos="fade-up">
                            <button className="rounded-full text-center py-3 px-9 border border-primary bg-primary text-[#ffffff]" data-aos-duration="2000">{textwithbutton.button_label}</button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
