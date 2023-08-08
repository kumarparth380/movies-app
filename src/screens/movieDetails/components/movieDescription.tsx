import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { PREVIEW_IMAGE_HEIGHT } from 'constants/gen';

import { Body } from 'components/typography';
import containers from 'styles/containers';
import { margins, padding } from 'styles/utils';

interface MovieDescriptionProps {
  length?: string;
  director?: string;
  cast?: string[];
  overview?: string;
  released?: string;
}

const MovieDescription: React.FC<MovieDescriptionProps> = ({
  length,
  director,
  cast,
  overview,
  released
}) => {
  const { t } = useTranslation();
  const year = released ? new Date(released).getFullYear() : '???';
  return (
    <View
      style={[
        padding.ph24,
        containers.flex1,
        {
          marginTop: PREVIEW_IMAGE_HEIGHT * 0.5 + 8
        }
      ]}
    >
      <Body>
        {year} | {length} | {director}
      </Body>

      <Body style={margins.mt16}>
        {t('movieDetailsScreen.cast')}: {cast?.join(', ')}
      </Body>

      <Body style={margins.mt16}>{overview}</Body>
    </View>
  );
};

export default memo(MovieDescription);
