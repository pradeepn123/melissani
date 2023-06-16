import {
    Hero    
  } from '~/components';
  
  export function Affiliate({affiliate_banner}) {
    console.log(affiliate_banner)
      return (
        <>
            {affiliate_banner && (
                <Hero data={affiliate_banner} id="affiliate-hero" height="full" top loading="eager" />
            )}          
        </>
      )
  }