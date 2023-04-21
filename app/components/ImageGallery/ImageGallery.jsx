import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

export function ImageGallery() {
    let location = useLocation();
    const [fourtySizeInitialized, setFourtySizeInitialized] = useState(false)

    useEffect(() => {
        window.FoursixtyEmbed.init();
        setFourtySizeInitialized(true);
    }, [location])

    return (
        <div className="image_gallery" dangerouslySetInnerHTML={{__html: `<script src="//foursixty.com/media/scripts/fs.embed.v2.5.js" data-feed-id="melissani" data-theme="showcase_v2_5" data-open-links-in-same-page="true" data-show-okendo-stars="true" data-page-size="10"></script>
        <style>.fs-has-links::after { padding:5px 7.5px;background-color:#ffffff;color:rgba(0, 0, 0, 0.8);content:"SHOP IT"; } .fs-showcase_v2_5.fs-desktop .fs-entry-container { width:20% !important;padding-top:20% !important; } .fs-showcase_v2_5.fs-mobile .fs-entry-container { width:50% !important;padding-top:50% !important; } .fs-wrapper div.fs-text-container .fs-entry-title, div.fs-detail-title { font-family:Times New Roman, serif;font-style:normal;font-weight:normal;font-size:14px; } div.fs-text-container .fs-entry-date, div.fs-detail-container .fs-post-info, div.fs-wrapper div.fs-has-links::after, .fs-text-product, .fs-overlink-text { font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-style:normal;font-weight:normal;font-size:14px; } .fs-wrapper div.fs-text-container * { color:#ffffff; } .fs-wrapper div.fs-text-container { background-color:rgba(0, 0, 0, 0.8);margin:0px; } div.fs-entry-date { display:none; } div.fs-entry-title { display:none; } .fs-showcase_v2_5.fs-wrapper div.fs-timeline-entry { margin:1px; } </style>
    `}}>
        </div>
    )
}

