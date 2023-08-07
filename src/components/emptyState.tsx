import React, { ReactNode } from 'react';
import { Feather } from '@expo/vector-icons';

import { SubHeader } from 'components/typography';

interface EmptyStateProps {
  title: ReactNode;
  isLoading?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, isLoading }) => {
  if (isLoading) return null;
  return (
    <>
      <Feather name="frown" size={24} color="black" />
      <SubHeader>{title}</SubHeader>
    </>
  );
};
