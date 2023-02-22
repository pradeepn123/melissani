const TextSection = ({data}) => <div className="flex-auto w-full py-8 px-6 md:pl-6 xl:w-6/12 right_text_block">
  <h2 className='right_text_heading text-black pb-6 md:w-8/12 leading-tight'>{data.heading}</h2>
  <p className='right_text_description md:w-8/12 text-black leading-snug'>{data.description}</p>
  <ul className="grid grid-cols-2">
    {(data?.items || []).map((item, index) => (
      <li key={`googbye-${index}`} className="flex py-4 text-black items-center gap-4">
        <img src={item.icon} alt="" />
        <p>{item.text}</p>
      </li>
    ))}
  </ul>
</div>

const ImageSection = ({data}) => <div className="flex-auto w-full xl:w-6/12">
    <img src={data?.image} alt='' className='w-full'/>
</div>

export function ImageWithText({ goodbye, alignment, className }) {
  return <section className={`w-full xl:flex gap-4 gb_bg_color md:gap-8 items-center ${className}`}>
    {alignment == "rtl" ? <>
      <TextSection data={goodbye} />
      <ImageSection data={goodbye}/>
    </>: <>
      <ImageSection data={goodbye}/>
      <TextSection data={goodbye} />
    </>}
  </section>
}
