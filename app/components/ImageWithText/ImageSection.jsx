export function ImageSection ({data, className }) {
    return (
      <div className={`img-sec flex-auto ${className && className} ${className == "filter-club-img" ? 'md:w-6/12' : 'xl:w-6/12'}`}>
          <picture>
              <source media="(max-width:640px)" srcSet={data?.smallimg} />
              <img className='w-full' src={data?.image} />
          </picture>
      </div>
    )
}