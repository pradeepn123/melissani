export function ImageSection ({data, filterClassName }) {
    return (
      <div className={`img-sec flex-auto ${filterClassName} ${filterClassName ? 'md:w-6/12' : 'xl:w-6/12'}}`}>
          <picture>
                        <source media="(max-width:640px)" srcSet={data?.smallimg} />
                        <img className='w-full' src={data?.image} />
                    </picture>
      </div>
    )
}