export function ImageGallery(data) {
    return (
    <>
    {data && <div className="image_gallery" dangerouslySetInnerHTML={{__html: data.data}}>
    </div>}
    </>
    )
}
