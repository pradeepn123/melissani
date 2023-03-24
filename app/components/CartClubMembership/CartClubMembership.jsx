import { CartClubMembershipIcon, QuestionIcon } from '~/components';
import {Button} from '~/components';

export function CartClubMembership({data}){
    return(
        <section className="cart-club-membership-section">
            <CartClubMembershipIcon className="cart-club-icon"/>
            <div className="club-membership-container">
                <span class="label label-default add-on-label">Add-on</span>
                <div className="club-membership-content">
                    <div className="club-membership-left-content">
                        <h3>Filter Club Membership</h3>
                        <p>
                            Save 10% on Melissani M1 Filters. Filters ship based on the optimum service cycle.
                        </p>
                        
                    </div>
                    <div className="club-membership-right-content">
                        <Button variant="secondary" className="club-membership-add-btn">+ADD</Button>
                    </div>
                </div>
                <div className="club-membership-price-benefits">
                    <div className="club-membership-price">
                        <span className="price">
                            $49.99
                        </span>
                        <span className="offer-price">
                            $44.99
                        </span>
                    </div>
                    <div className="club-membership-benefits">
                        <QuestionIcon className="cart-question-icon"/>
                        <p className="club-membership-benefits-text">
                            Filter Club Benefits
                        </p>
                    </div>
                </div>
                <hr />
                <p className="club-membership-bottom-text">
                    Join our filter club for free! Get charged only when we ship your product after 6 months.
                </p>
            </div>
        </section>
    )
}