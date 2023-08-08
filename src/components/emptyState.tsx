import React, { ReactNode } from 'react';
import { Feather } from '@expo/vector-icons';

import { LoadingState } from 'types/movies';

import { SubHeader } from 'components/typography';

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
    <>
      <Feather name="frown" size={24} color="black" />
      <SubHeader>{title}</SubHeader>
    </>
  );
};
