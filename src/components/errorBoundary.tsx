import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { SubHeader } from 'components/typography';
import containers from 'styles/containers';
import { margins, padding } from 'styles/utils';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export const ErrorUI: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View
      testID="error-boundary-ui"
      style={[
        containers.fullWidth,
        containers.fullHeight,
        containers.center,
        padding.p32
      ]}
    >
      <Feather name="frown" size={24} color="black" />
      <SubHeader weight="bold" style={[margins.mt16, { textAlign: 'center' }]}>
        {t('errorText')}
      </SubHeader>
    </View>
  );
};

/**
 * ErrorBoundary to catch errors anywhere in its child component tree,
 * log those errors,
 * and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(_: Error) {
    // Handle the error, e.g., log it to a server
    // We can also perform additional actions if needed
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorUI />;
    }

    return children;
  }
}

export default ErrorBoundary;
