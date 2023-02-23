export function ImageSection ({data, filterClassName}) {
    return (
      <div className={`flex-auto ${filterClassName} ${filterClassName ? 'md:w-6/12' : 'xl:w-6/12'}}`}>
          <img src={data?.image} alt='' className='w-full'/>
      </div>
    )
}