import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, View } from 'react-native';

import { LoadingState } from 'types/movies';

import { colors } from 'styles/colors';
import containers from 'styles/containers';

import { EmptyState } from './emptyState';

interface Props {
  loadingState: LoadingState;
}

const Loading = ({ loadingState }: Props) => {
  const { t } = useTranslation();
  const { width, height } = Dimensions.get('window');
  const loadingViewSizes = { height, width };
  if (loadingState === LoadingState.loading)
    return (
      <View
        style={[
          containers.centerContent,
          containers.positionAbsolute,
          loadingViewSizes
        ]}
      >
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );

  if (loadingState === LoadingState.failed)
    return <EmptyState title={t('noResult')} loadingState={loadingState} />;

  return null;
};

export default Loading;
