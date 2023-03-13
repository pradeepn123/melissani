export function TextWithButton({textwithbutton}) {
    return (
        <section>
            <div className="text_with_button_info">
                <div className="container mx-auto">
                    <div className="text_with_button_info_inner">
                        <h2>{textwithbutton.heading}</h2>
                        <h3>{textwithbutton.subheading}</h3>
                        <a href={textwithbutton.button_url}>
                            <button className="rounded-full text-center py-3 px-9 border border-primary bg-primary text-[#ffffff]">{textwithbutton.button_label}</button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
