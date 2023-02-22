export function ImageSection ({data}) {
    return (
      <div className="flex-auto w-full xl:w-6/12">
          <img src={data?.image} alt='' className='w-full'/>
      </div>
    )
}