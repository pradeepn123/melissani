
export function Specifications({data}) {
  return (
    <>
    {data.map((dataItem, dataIndex) => 
        <section className="specifications-section" key={dataIndex}>
            <h1 className="specification-heading">
                {dataItem.title}
            </h1>
            <div className="specification-content">
                <div className="specification-text">
                    {dataItem.spec_details_column1.map((spec_item, spec_index) => 
                    (
                        <p className="spec-wrap" key={spec_index}>
                            <p className="spec-title">
                                {spec_item.title}
                            </p>
                            <p className="spec-description">
                                {spec_item.description}
                            </p>
                        </p>
                    ))}
                </div>
                <div className="specification-text">
                    {dataItem.spec_details_column2.map((spec_item, spec_index) => 
                    (
                        <p className="spec-wrap" key={spec_index}>
                            <p className="spec-title">
                                {spec_item.title}
                            </p>
                            <p className="spec-description">
                                {spec_item.description}
                            </p>
                        </p>
                    ))}
                </div>
                <div className="specification-text column-three">
                    {dataItem.spec_details_column3.map((spec_item, spec_index) => 
                    (
                        <p className="spec-wrap" key={spec_index}>
                            <p className="spec-title">
                                {spec_item.title}
                            </p>
                            <p className="spec-description">
                                {spec_item.description}
                            </p>
                        </p>
                    ))}
                </div>
            </div>
        </section>
    )}
    </>
  )
}
