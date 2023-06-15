import {
    Hero    
  } from '~/components';
  
  export function Affiliate({hero}) {
    console.log(hero)
      return (
        <>
          {hero && (
              <Hero data={hero} id="affiliate-hero" height="full" top loading="eager" />
          )}          
        </>
      )
  }