
export function Specifications({data}) {
  return (
    <>
    {data.map((dataItem, dataIndex) => 
        <section className="specifications-section" key={`specifications-data-${dataIndex}`}>
            <h1 className="specification-heading">
                {dataItem.title}
            </h1>
            <div className="specification-content">
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
            </div>
        </section>
    )}
    </>
  )
}
