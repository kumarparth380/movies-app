import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { LoadingState } from 'types/movies';

import { SubHeader } from 'components/typography';
import containers from 'styles/containers';
import { padding } from 'styles/utils';

interface EmptyStateProps {
  title: ReactNode;
  loadingState?: LoadingState;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  loadingState
}) => {
  if (loadingState === LoadingState.loading) return null;
  return (
    <View
      style={[containers.componentContainer, padding.p32]}
      testID="empty-state-container"
    >
      <Feather name="frown" size={24} color="black" />
      <SubHeader>{title}</SubHeader>
    </View>
  );
};
