import {Button, Link} from '~/components';

export function FilterClubTextSection({ filterClub }) {
    return (
        <div className="filter-club-section">
    <h2 className="filter-club-title">
        {filterClub.heading}
    </h2>
    <p className="filter-club-description font-tertiary">
        {filterClub.description}
    </p>
    <ul className="filter-club-list">
        {filterClub.items.map((listItem, index)=>
            <li className="filter-club-list-item" key={index}>
                <div className="filter-club-list-icon">
                    <img src={listItem.icon} />
                </div>
                <div className="filter-club-list-text font-tertiary">
                    {listItem.text}
                </div>
            </li>
        )}
    </ul>
    <div className="filter-club-btns">
        <div className="subscribe-btn">
            <Link
                to={filterClub.subscribeBtnLink}>
                <Button variant='primary' className='filterclub-subscribeBtn font-medium'>
                    {filterClub.subscribeBtnText}
                </Button>
            </Link>
        </div>
        <div className="filter-club-learn-more-btn">
            <Link
                to={filterClub.learnMoreBtnLink}>
                <Button variant='inline' className="font-medium">
                    {filterClub.learnMoreBtnText}
                </Button>
            </Link>
        </div>
    </div>
        </div>
    )
}
