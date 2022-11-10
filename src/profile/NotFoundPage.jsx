import React from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

export default function NotFoundPage() {
  return (
    <div className="py-5 container-mw-lg container-fluid d-flex justify-content-center align-items-start text-center">
      <p className="my-0 py-5 text-muted" style={{ maxWidth: '32em' }}>
        <FormattedMessage
          id="profile.notfound.message"
          defaultMessage="The page you're looking for is unavailable or there's an error in the URL. Please check the URL and try again."
          description="error message when a page does not exist"
        />
      </p>
    </div>
  );
}
