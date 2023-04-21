import React from "react";

class ImageGallery extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        window.FoursixtyEmbed.init()
    }

    render () {
        return <div className="image_gallery" dangerouslySetInnerHTML={{__html: this.props.data}}>
        </div>
    }
}
export {
    ImageGallery
};
