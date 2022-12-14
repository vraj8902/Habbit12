import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from "react-native";

const ClickableView = (props) => {
  const {
    style,
    onPress,
    disabled,
    background,
    activeOpacity,
    rippleColor,
    children,
  } = props;

  if (Platform.OS === "android") {
    return (
      <View style={style}>
        <TouchableNativeFeedback
          onPress={onPress}
          disabled={disabled || false}
          background={
            background ||
            TouchableNativeFeedback.Ripple(
              rippleColor || "rgba(220,220,220,10)",
              true
            )
          }
        >
          <View>{children}</View>
        </TouchableNativeFeedback>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        style={style}
        onPress={onPress}
        disabled={disabled || false}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

export { ClickableView };
