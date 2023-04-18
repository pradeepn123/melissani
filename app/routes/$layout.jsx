import { useEffect } from "react";
import { useRouter } from "remix";

const TWITTER_PIXEL_ID = "oenmr";

function TwitterPixel() {
  const { location } = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.twq) {
      window.twq = function () {
        window.twq.exe ? window.twq.exe.apply(window.twq, arguments) : window.twq.queue.push(arguments);
      };

      window.twq.version = "1.1";
      window.twq.queue = [];

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://static.ads-twitter.com/uwt.js`;
      document.head.appendChild(script);
    }

    window.twq("init", TWITTER_PIXEL_ID);
    window.twq("track", "PageView");
  }, [location]);

  return null;
}

export function Meta() {
  return <TwitterPixel />;
}
