export function FooterContact({data}) {
  return (
    <div className="footer-image-section w-full pt-0 px-6 lg:pt-0 md:px-8 lg:px-12 md:flex">
        <div className="footer-text flex item-center flex-col md:w-6/12">
          <p className="footer-heading">
            {data?.heading}
          </p>
          <div className="footer-contact-wrapper flex mt-7">
            {data?.contact.map((item, index) => (
              <div key={`footer-${index}`} className="footer-contact-icons">
                <a href={item.link} className="footer-icon-text-wrapper">
                  <span className="footer-icon-wrapper"><img src={item.icon} width="85" alt="" /></span>
                  <p className="footer-icon-text">{item.iconText}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-image md:w-6/12">
          <img className="footer_img" src={data?.footer_img} />
          <img className="footer_mobile_img" src={data?.footer_mobile_img} />
        </div>
    </div>
  )
}
