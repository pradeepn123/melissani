import {FeaturedSection} from './FeaturedSection';
import {PageHeader, Text} from './Text';
import {Button, Link} from '~/components';

export function NotFound({type = 'page', heading, subHeading, description, notFound}) {

  return (
    <>
      <PageHeader heading={heading} className="not_found_header">
        <Text width="narrow" as="h2">
           {subHeading}
        </Text>
        {description && <Text width="narrow" as="p">
          {description}
        </Text>}
        {notFound && <Link
            to={'/'}>
            <Button variant='primary' className="font-medium">
            Back to home
            </Button>
        </Link>}
      </PageHeader>
    </>
  );
}
