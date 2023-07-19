export function ImageSection ({data, className }) {
    return (
    <div className={`img-sec flex-auto ${className && className} ${className != 'four-blocks-image' ? 'xl:w-6/12' : null }`}>
          <picture>
                {className != "four-blocks-image" && 
                    <source media="(max-width:640px)" srcSet={data?.smallimg} />
                }
                {className == "four-blocks-image" && 
                    <img className="adv-filter-mobile-img" src={data?.smallimg} />
                }
              <img className='w-full desktop-img' src={data?.image} />
          </picture>
      </div>
    )
}