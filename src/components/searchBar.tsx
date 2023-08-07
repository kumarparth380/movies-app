import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import containers from 'styles/containers';
import { margins } from 'styles/utils';

interface Props {
  search: string;
  setSearch: any;
}

const SearchBar = (props: Props, inputRef: React.Ref<any>) => {
  const { t } = useTranslation();
  const { search, setSearch } = props;
  return (
    <View style={[containers.fullWidth, margins.mt16]}>
      <FontAwesome name="search" size={20} style={styles.searchIcon} />
      <TextInput
        ref={inputRef}
        placeholder={t('search')}
        style={styles.searchInput}
        value={search}
        placeholderTextColor="gray"
        onChangeText={setSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    top: Platform.select({ ios: 10, android: 14 }),
    left: 12
  },
  searchInput: {
    paddingVertical: 12,
    paddingLeft: 40,
    backgroundColor: '#f4f4f4',
    borderRadius: 6
  }
});

export default forwardRef(SearchBar);
