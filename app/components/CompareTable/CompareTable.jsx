import {
    CompareYesIcon,
    CompareNoIcon,
    CompareSomeIcon
} from '~/components';

export function CompareTable({ productCompareContent }) {
    const mobileTableHeadings = productCompareContent.tableHeader.slice(1, productCompareContent.tableHeader.length);
    return (
        <>
        {productCompareContent &&
        <section className='compare-section h-full'>
            <div className="desktop-compare-table">
                <div className="compare-table-container">
                    <table className="compare-table" cellSpacing={0}>
                        <tr>
                            { productCompareContent?.tableHeader.map((tableHeadContent, tableHeadIndex) => (
                                <th className={tableHeadIndex == 0 ? "fixed-td fixed-hd left-top-td": "scrollable-td fixed-hd"} key={tableHeadIndex}>
                                    <img className="table-header-image" src={tableHeadContent.image} id={ tableHeadIndex == 0 ? "table-header-brand-icon": "table-header-product-image" } />
                                    <p className="table-header-title" id={ tableHeadIndex == 0 ? "table-header-compare-title": "table-header-product-name" }>
                                        {tableHeadContent.title}
                                    </p>
                                </th> ))
                            }
                        </tr>
                        { productCompareContent?.tableRow.map((tableRowContent, tableRowIndex) => (
                            <tr className="compare-table-row" key={tableRowIndex}>
                                <td className="fixed-td">{tableRowContent?.property}</td>
                                {tableRowContent?.values.map((rowValue, rowValueIndex) => (
                                    <td className={rowValue.value == 'Yes' ? 'compare-value-yes scrollable-td compare-value' : rowValue.value == 'No' ? 'compare-value-no scrollable-td compare-value' : 'compare-value-some scrollable-td compare-value' } key={rowValueIndex}>
                                        <span className="compare-value-icon">
                                            {rowValue.value == 'Yes' ? <CompareYesIcon /> : rowValue.value == 'No' ? <CompareNoIcon /> : <CompareSomeIcon /> }
                                            {rowValue.value}
                                        </span>
                                    </td> ))
                                }
                            </tr>))
                        }
                    </table>
                </div>
            </div>
            <div className="mobile-grid-compare">
                <h2 className="mobile-table-heading">{productCompareContent?.mobileTableHeading}</h2>
                <div className="mobile-grid-container" data-scroll>
                    <div className="mobile-grid-table">
                        <div className="grid-heading-row" data-target>
                            { mobileTableHeadings?.map((tableHeadContent, tableHeadIndex) => (
                            <div className="grid-heading-row-data" key={tableHeadIndex}>
                            <img className="table-header-image table-header-product-image" src={tableHeadContent.mobile_image} />
                            <p className="table-header-title table-header-product-name">
                                {tableHeadContent.title}
                            </p>
                        </div> ))
                        }
                    </div>
                    <div className="grid-heading-row__dummy"></div>
                    { productCompareContent?.tableRow.map((tableRowContent, tableRowIndex) => (
                        <div className="grid-properties-row">
                            <div className="grid-property-row" key={tableRowIndex}>
                                <p>{tableRowContent?.property}</p>
                            </div>
                            <div className="grid-property-value-row">
                                {tableRowContent?.values.map((rowValue, rowValueIndex) => (
                                <div className={`${rowValue.value == 'Yes' ? 'compare-value-yes' : rowValue.value == 'No' ?
                                'compare-value-no' : 'compare-value-some'} ${rowValueIndex == 0 ? 'compare-value' : 'compare-value scrollable-td fixed-hd'}`}
                                key={rowValueIndex}>
                                    <span className="compare-value-icon">
                                    {rowValue.value == 'Yes' ? <CompareYesIcon /> : rowValue.value == 'No' ? <CompareNoIcon /> : <CompareSomeIcon /> }
                                    {rowValue.value}
                                    </span>
                            </div> ))}
                        </div>
                </div>))}
                </div>
                </div>
            </div>


            {/* <div className="mobile-compare-table-y">
                <h2 className='mobile-table-heading'>{productCompareContent?.mobileTableHeading}</h2>
                    <div className="mobile-compare-table-container">
                    <table className="mobile-compare-table" cellSpacing={0}>
                        <tr>
                        { mobileTableHeadings?.map((tableHeadContent, tableHeadIndex) => (
                        <th className={tableHeadIndex == 0 ? "fixed-td fixed-hd left-top-td": "scrollable-td fixed-hd"} key={tableHeadIndex}>
                            <img className="table-header-image table-header-product-image" src={tableHeadContent.mobile_image} />
                            <p className="table-header-title table-header-product-name">
                            {tableHeadContent.title}
                            </p>
                        </th> ))
                        }
                        </tr>
                        { productCompareContent?.tableRow.map((tableRowContent, tableRowIndex) => (
                            <>
                                <tr className="compare-property-row" key={tableRowIndex}>
                                    <td className="first-column-heading property-row table-display-block" colSpan={4}>
                                        {tableRowContent?.property}
                                    </td>
                                </tr>
                                <tr className="compare-table-row" key={tableRowIndex}>
                                    {tableRowContent?.values.map((rowValue, rowValueIndex) => (
                                    <td className={`${rowValue.value == 'Yes' ? 'compare-value-yes' : rowValue.value == 'No' ?
                                    'compare-value-no' : 'compare-value-some'} ${rowValueIndex == 0 ? 'compare-value' : 'scrollable-td fixed-hd'}`}
                                    key={rowValueIndex}>
                                        <span className="compare-value-icon">
                                        {rowValue.value == 'Yes' ? <CompareYesIcon /> : rowValue.value == 'No' ? <CompareNoIcon /> : <CompareSomeIcon /> }
                                        {rowValue.value}
                                        </span>
                                    </td> ))}
                                </tr>
                            </>
                        )) }
                    </table>
                </div>
            </div> */}



    {/* <div role="compare-property" aria-labelledby="caption" tabindex="0">
        <table className="new-mobile-compare-table">
            <thead>
                <tr>
                    { mobileTableHeadings?.map((tableHeadContent, tableHeadIndex) => (
                        <th key={tableHeadIndex}>
                            <img className="table-header-image table-header-product-image" src={tableHeadContent.mobile_image} />
                            <p className="table-header-title table-header-product-name">
                                {tableHeadContent.title}
                            </p>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
            { productCompareContent?.tableRow.map((tableRowContent, tableRowIndex) => (
                    <tr>
                        <th className="compare-property-row" key={tableRowIndex}>
                                {tableRowContent?.property}
                        </th>
                        {/* <td className="compare-table-row" key={tableRowIndex}> */}
                            {/* {tableRowContent?.values.map((rowValue, rowValueIndex) => (
                                <td className={`${rowValue.value == 'Yes' ? 'compare-value-yes' : rowValue.value == 'No' ?
                                'compare-value-no' : 'compare-value-some'} ${rowValueIndex == 0 ? 'compare-value' : 'scrollable-td fixed-hd'}`}
                                key={rowValueIndex}>
                                    <span className="compare-value-icon">
                                    {rowValue.value == 'Yes' ? <CompareYesIcon /> : rowValue.value == 'No' ? <CompareNoIcon /> : <CompareSomeIcon /> }
                                    {rowValue.value}
                                    </span>
                                </td>
                            ))} */}
                        {/* </td> */}
                    {/* </tr>
                )) }
            </tbody>
        </table>
    </div> */}



</section>
}
</>
)
}