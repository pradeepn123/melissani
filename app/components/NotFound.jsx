import {FeaturedSection} from './FeaturedSection';
import {PageHeader, Text} from './Text';
import {Button, Link} from '~/components';

export function NotFound({type = 'page'}) {
  const heading = `404`;
  const description = `The page may have been removed, had its name changed, or is temporarily unavailable.`;
  const subHeading = `Oops! We couldn't find the page you were looking for.`
  return (
    <>
      <PageHeader heading={heading} className="not_found_header">
        <Text width="narrow" as="h2">
           {subHeading}
        </Text>
        <Text width="narrow" as="p">
          {description}
        </Text>
        <Link
            to={'/'}>
            <Button variant='primary' className="font-medium">
            Back to home
            </Button>
        </Link>
      </PageHeader>
    </>
  );
}
