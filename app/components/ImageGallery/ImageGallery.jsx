export function ImageGallery(data) {
    return (
    <div className="image_gallery" dangerouslySetInnerHTML={{__html: data.data}}>
    </div>
    )
}
