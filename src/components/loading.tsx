import { ActivityIndicator, Dimensions, View } from 'react-native';

import { colors } from 'styles/colors';
import containers from 'styles/containers';

interface Props {
  isLoading: boolean;
}

const Loading = ({ isLoading }: Props) => {
  const { width, height } = Dimensions.get('window');
  const loadingViewSizes = { height, width };
  if (!isLoading) return null;
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
};

export default Loading;
