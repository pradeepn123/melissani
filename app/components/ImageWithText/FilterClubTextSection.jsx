import {Button, Link} from '~/components';

export function FilterClubTextSection({ filterClub }) {
    return (
        <div className="filter-club-section">
    <h2 className="filter-club-title">
        {filterClub.heading}
    </h2>
    <p className="filter-club-description">
        {filterClub.description}
    </p>
    <ul className="filter-club-list">
        {filterClub.items.map((listItem, index)=>
            <li className="filter-club-list-item" key={index}>
                <div className="filter-club-list-icon">
                    <img src={listItem.icon} />
                </div>
                <div className="filter-club-list-text">
                    {listItem.text}
                </div>
            </li>
        )}
    </ul>
    <div className="filter-club-btns">
        <div className="subscribe-btn">
            <Link
                to={filterClub.subscribeBtnLink}>
                <Button className="filter-shop-btn">
                    {filterClub.subscribeBtnText}
                </Button>
            </Link>
        </div>
        <div className="filter-club-learn-more-btn">
            <Link
                to={filterClub.learnMoreBtnLink}>
                <Button className="learn-more-btn">
                    {filterClub.learnMoreBtnText}
                </Button>
            </Link>
        </div>
    </div>
        </div>
    )
}
