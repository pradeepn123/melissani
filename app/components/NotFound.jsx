import {FeaturedSection} from './FeaturedSection';
import {PageHeader, Text} from './Text';
import {Button, Link} from '~/components';

export function NotFound({type = 'page', heading, subHeading, description, notFound, buttonText}) {
  return (
    <>
      <PageHeader heading={heading} className="not_found_header">
        <Text width="narrow" as="h2">
           {subHeading}
        </Text>
        {description && <Text width="narrow" as="p">
          {description}
        </Text>}
        {buttonText && <Link
            to={notFound ? '/' : '#'}>
            <Button variant='primary' className="font-medium">
              {buttonText}
            </Button>
        </Link>}
      </PageHeader>
    </>
  );
}
