export function ContaminantTextSection({ data }) {
    return (
        <div className="flex-auto w-full py-8 px-6 md:pl-6 xl:w-6/12 right_text_block" data-aos="fade-up">
            <h2 className='right_text_heading xl:pr-32 text-black pb-6 leading-tight'>{data.heading}</h2>
            <p className='right_text_description xl:pr-32 text-black leading-snug font-tertiary'>{data.description}</p>
            <ul className="grid grid-cols-2">
                {(data?.items || []).map((item, index) => (
                    <li key={`googbye-${index}`} className="flex py-4 text-black items-center gap-4 font-tertiary">
                        <img src={item.icon} alt="" width="60px" />
                        <p className="contaminants-list font-tertiary">{item.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}