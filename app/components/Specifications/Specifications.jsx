import { useState, useRef } from 'react';
import { ArrowDownRef } from '~/components';

export function Specifications({data}) {
  const accordionRef = useRef(null);
  const [openAccordion, setOpenAccordion] = useState(false);
  
  return (
    <>
    {data.map((dataItem, dataIndex) => 
        <section className="specifications-section" key={`specifications-data-${dataIndex}`}>
            <div className="specification-heading">
                <h1>
                    {dataItem.title}
                </h1>
                <ArrowDownRef
                    className="arrow-down-icon"
                    innerRef={accordionRef}
                    onClick={()=>setOpenAccordion(!openAccordion)}
                />
            </div>
            {openAccordion || accordionRef && <div className="specification-content">
                <div className="specification-text">
                    {dataItem.spec_details_column1.map((spec_item, spec_index) => <div
                        className="spec-wrap"
                        key={`specifications-1-${spec_index}`}
                    >
                        <p className="spec-title">
                            {spec_item.title}
                        </p>
                        {spec_item.description.map((point, point_index) => 
                            <p className="spec-description" key={point_index}>
                                    {point}
                            </p>
                        )}
                    </div>)}
                </div>
                <div className="specification-text">
                    {dataItem.spec_details_column2.map((spec_item, spec_index) => <div
                        className="spec-wrap"
                        key={`specifications-2-${spec_index}`}
                    >
                        <p className="spec-title">
                            {spec_item.title}
                        </p>
                        {spec_item.description.map((point, point_index) =>
                            <p className="spec-description" key={point_index}>
                                    {point}
                            </p>
                        )}
                    </div>)}
                </div>
                <div className="specification-text">
                    {dataItem.spec_details_column3.map((spec_item, spec_index) => <div
                        className="spec-wrap"
                        key={`specifications-${spec_index}`}
                    >
                        <p className="spec-title">
                            {spec_item.title}
                        </p>
                        {spec_item.description.map((point, point_index) =>
                            <p className="spec-description" key={point_index}>
                                {point}
                            </p>
                        )}
                    </div>)}
                </div>
                <div className="specification-text column-four">
                    {dataItem.spec_details_column4.map((spec_item, spec_index) => <div
                        className="spec-wrap"
                        key={`specifications-${spec_index}`}
                    >
                        <p className="spec-title">
                            {spec_item.title}
                        </p>
                        {spec_item.description.map((point, point_index) =>
                            <p className="spec-description" key={point_index}>
                                    {point}
                            </p>
                        )}
                    </div>)}
                </div>
            </div>}
        </section>
    )}
    </>
  )
}
