import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { navigationService } from 'navigations/navigationService';
import { useStore } from 'store/movies';

import { colors } from 'styles/colors';
import containers from 'styles/containers';
import { padding } from 'styles/utils';

interface HeaderProps {
  id: string;
  inverse?: boolean;
  withFavoriteButton?: boolean;
  withBackButton?: boolean;
}

const styles = StyleSheet.create({
  navigationContainer: {
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 16
  },
  backButtonContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 30,
    width: 30,
    borderRadius: 15
  }
});

export const Header = ({
  id,
  inverse,
  withFavoriteButton = true,
  withBackButton = true
}: HeaderProps) => {
  const { toggleFavorites, selectIsFavoriteMovie } = useStore();
  const isFavorite = selectIsFavoriteMovie(id);
  const safeAreaInsets = useSafeAreaInsets();
  const safeAreaStyle = useMemo(
    () => ({ flex: 1, paddingTop: safeAreaInsets.top }),
    [safeAreaInsets]
  );

  const handleToggleFavoriteMoview = () => {
    toggleFavorites(id);
  };

  const handleBackPress = () => {
    navigationService.pop();
  };

  const defaultColor = inverse ? colors.black : colors.white;

  return (
    <View style={[styles.navigationContainer, safeAreaStyle]}>
      {withBackButton ? (
        <TouchableOpacity
          onPress={handleBackPress}
          style={[containers.center, styles.backButtonContainer]}
        >
          <Feather name="chevron-left" color="white" size={26} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {withFavoriteButton ? (
        <TouchableOpacity
          style={padding.ph16}
          testID={isFavorite ? 'favorite' : 'favorite-outline'}
          onPress={handleToggleFavoriteMoview}
        >
          <MaterialIcons
            name={isFavorite ? 'favorite' : 'favorite-outline'}
            size={24}
            color={isFavorite ? colors.rose : defaultColor}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default memo(Header);
