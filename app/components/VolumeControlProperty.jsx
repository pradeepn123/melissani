
export function VolumeControlProperty({ volume }) {
    return (
        <section>
            <div className="relative flex justify-center">
                <h2
                    className="absolute text-center z-30 font-bold text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-72 lg:w-96 main-header-volume-controller">
                    {volume.mainText}
                </h2>

                <div className="lg:flex-row lg:w-auto sm:flex sm:flex-col">
                    {volume.items.map((item) => {
                        return (
                            <div className="lg:w-6/12">
                                <div className=" relative top-0 -left-0" >
                                    <img className="relative top-0 -left-0" src={item?.bgImage} />
                                    <img
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 md:w-16 xl:w-20"
                                        src={item?.iconWithText} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}