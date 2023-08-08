import { ActivityIndicator, Dimensions, View } from 'react-native';

import { LoadingState } from 'types/movies';

import { ErrorUI } from 'components/errorBoundary';
import { colors } from 'styles/colors';
import containers from 'styles/containers';

interface Props {
  loadingState: LoadingState;
}

const Loading = ({ loadingState }: Props) => {
  const { width, height } = Dimensions.get('window');
  const loadingViewSizes = { height, width };
  if (loadingState === LoadingState.loading)
    return (
      <View
        testID="loading-container"
        style={[
          containers.centerContent,
          containers.positionAbsolute,
          loadingViewSizes
        ]}
      >
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );

  if (loadingState === LoadingState.failed) return <ErrorUI />;

  return null;
};

export default Loading;
