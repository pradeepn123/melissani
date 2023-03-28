import { IconPlay } from '~/components';
import React from 'react';

export class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onPlay: false
        }
    }

    handlePlay = () => this.setState({onPlay: true})

    render() {
        const { data } = this.props;
        const { onPlay } = this.state;
        return (
            <div className="video-player-wrapper" data-aos="fade-up">
                <img src={data.thumbnail} className={onPlay ? "video-thumbnail opacity-0" : "video-thumbnail"} />
                {!onPlay && <IconPlay className="play-icon" onClick={this.handlePlay.bind(this)} />}
                {onPlay && <>
                    {data.id == "external_video_url" ?
                    <>
                        {data.host == "vimeo" &&
                            <iframe src={data.autoPlay == true ? `${data.videoSrc}?autoplay=1` : `${data.videoSrc}`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
                        }
                        {data.host == "youtube" && 
                            <>{data.autoPlay == true ? 
                            <iframe src={`${data.videoSrc}?playsinline=1&background=1&autoplay=1&controls=1&mute=1&loop=1&enablejsapi=1&rel=0&modestbranding=1`} allow="autoplay; encrypted-media" allowFullScreen></iframe>
                            : <iframe src={`${data.videoSrc}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            }</>
                        }
                    </> :
                    <>
                        {data.autoPlay == true ? <video muted loop playsInline autoPlay controls preload="metadata">
                            <source src={`${data.videoSrc}`} type="video/mp4" />
                        </video> : <video controls playsInline preload="metadata">
                            <source src={`${data.videoSrc}`} type="video/mp4" />
                        </video>}
                    </>}
                </>}
            </div>
        );
    }
}
