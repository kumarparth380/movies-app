import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle
} from 'react-native';

import { colors } from 'styles/colors';
import text from 'styles/typography';

interface Weights {
  [key: string]: FontFamily;
  bold: FontFamily;
  regular: FontFamily;
}

interface FontFamily {
  fontFamily: string;
}

const weights: Weights = {
  bold: { fontFamily: 'bold' },
  regular: { fontFamily: 'space-mono' }
};

interface TypographyProps {
  children: any;
  style?: StyleProp<TextStyle>;
  weight?: 'space-mono' | 'bold';
  color?: string;
  numberOfLines?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

export const SubCaption = ({
  children,
  style,
  weight = 'space-mono',
  onPress,
  color = colors.black,
  numberOfLines
}: TypographyProps) => (
  <Text
    numberOfLines={numberOfLines}
    testID="typographyBody"
    onPress={onPress}
    style={[text.subCaption, weights[weight], style, { color }]}
  >
    {children}
  </Text>
);

export const Caption = ({
  children,
  style,
  weight = 'space-mono',
  onPress,
  color = colors.black,
  numberOfLines
}: TypographyProps) => (
  <Text
    numberOfLines={numberOfLines}
    testID="typographyBody"
    onPress={onPress}
    style={[text.caption, weights[weight], style, { color }]}
  >
    {children}
  </Text>
);

export const Body = ({
  children,
  style,
  weight = 'space-mono',
  onPress,
  color = colors.black,
  numberOfLines
}: TypographyProps) => (
  <Text
    numberOfLines={numberOfLines}
    testID="typographyBody"
    onPress={onPress}
    style={[weights[weight], style, { color }]}
  >
    {children}
  </Text>
);

export const SubHeader = ({
  children,
  weight = 'space-mono',
  style,
  color = colors.black,
  onPress,
  numberOfLines
}: TypographyProps) => (
  <Text
    numberOfLines={numberOfLines}
    onPress={onPress}
    testID="subheader"
    style={[text.h6, weights[weight], style, { color }]}
  >
    {children}
  </Text>
);

export const Header = ({
  children,
  weight = 'space-mono',
  color = colors.black,
  style,
  numberOfLines
}: TypographyProps) => (
  <Text
    testID="header"
    numberOfLines={numberOfLines}
    style={[text.h5, weights[weight], { color }, style]}
  >
    {children}
  </Text>
);
