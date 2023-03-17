export function FooterContact({data}) {
  return (
    <div className="footer-image-section w-full pt-8 px-6 lg:pt-16 md:px-8 lg:px-12 md:flex">
        <div className="footer-text flex item-center flex-col md:w-6/12">
          <p>
            {data?.heading}
            <span className='footer-subHeading leading-tight font-tertiary'>{data?.subHeading}</span>
          </p>
          <div className="footer-contact-wrapper flex mt-7">
            {data?.contact.map((item, index) => (
              <div key={`footer-${index}`} className="footer-contact-icons mr-7">
                <a href={item.link}>
                  <img src={item.icon} width="85" alt="" />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-image md:w-6/12">
          <img src={data?.image} />
        </div>
    </div>
  )
}
