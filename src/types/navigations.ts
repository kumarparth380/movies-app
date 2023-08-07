import React from 'react';

import { RootStackParamList } from 'types/rootStackParamList';

export interface RootNavigatorProps {
  initialRoute?: keyof RootStackParamList;
}

export interface RouteProps {
  component: React.ReactNode | React.FC<any>;
  nested?: boolean;
  navigator?: NavigationGenerationConfig;
  authenticate?: boolean;
  initialParams?: Record<string, any>;
}

export type NavigationGenerationConfig = Record<string, RouteProps>;
