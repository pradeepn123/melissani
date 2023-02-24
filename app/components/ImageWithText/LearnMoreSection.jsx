import {Button, Link} from '~/components';


export function LearnMoreSection({data}) {
  return (
    <div className="learn-more-container flex-auto w-full md:p-8 md:w-6/12 lg:p-16 lg:pt-20">
        <div 
          className="learn-more-header text-black md:font-bold md:text-3xl md:mb-3 lg:text-4xl xl:text-5xl xl:mb-8">
          {data.header}
        </div>
        <div 
          className="learn-more-content text-black md:font-normal md:text-base md:mb-3 lg:text-lg lg:mb-4 xl:text-2xl xl:mb-12">
          {data.text}
        </div>
      <div className="flex md:w-6/12">
        {data?.cta && 
          <Link
              to="/products/">
              <Button className="learn-more-sec-btn">
                  {data.cta}
                </Button>
          </Link>}
        </div>
    </div>
  );
}
