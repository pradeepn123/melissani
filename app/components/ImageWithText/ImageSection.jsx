export function ImageSection ({data, className }) {
    return (
    <div className={`img-sec flex-auto ${className && className} ${className != 'four-blocks-image' ? 'xl:w-6/12' : null }`}>
          <picture>
              <source media={className != "four-blocks-image" ? "(max-width:640px)" : null} srcSet={data?.smallimg} />
              <img className='w-full' src={data?.image} />
          </picture>
      </div>
    )
}