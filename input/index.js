import React, {Component} from 'react';
import {View, TextInput, Platform, Dimensions} from 'react-native';
import Label from './Label';
import Placeholder from './Placeholder';
import Underline from './Underline';
import ErrorHelper from './ErrorHelper';
import {
  AwesomeIcon,
  IonIcon,
  EvilIcon,
  MaterialDesignIcon,
  OctIcon,
  MaterialIcon,
} from './icons';
import {ClickableView} from './clickableView';

export default class extends Component {
  static defaultProps = {
    ...ErrorHelper.defaultProps,
    onFocus: () => {},
    onBlur: () => {},
    onChangeText: () => {},
    onContentSizeChange: () => {},
    value: null,
    marginBottom: 8,
    paddingTop: 20,
    paddingRight: 0,
    paddingBottom: 8,
    paddingLeft: 0,
    color: 'black',
    fontSize: 12,
    fontWeight: 'normal',
    rippleColor: 'rgba(220,220,220,10)',
    rightIconType: 'ion',
    leftIconType: 'ion',
    rightIconSize: 15,
    leftIconSize: 15,
    rightIconColor: '#777777',
    leftIconColor: '#777777',
  };

  constructor(props) {
    super(props);

    this.state = {
      value: null,
      focused: false,
      height: props.fontSize * 1.5,
      iconPaddingRight: 0,
      iconPaddingLeft: 0,
    };
  }

  componentWillMount() {
    this._iconPaddingLeft();
    this._iconPaddingRight();
  }

  componentDidMount() {
    if (this.props.refrance) {
      this.props.refrance(this.refs.refrance);
    }
  }

  render() {
    let {focused, height, iconPaddingLeft, iconPaddingRight} = this.state;
    let value = this.props.value != null ? this.props.value : this.state.value;
    let hasValue = value && value.length > 0;
    let active = focused || hasValue;
    const {width} = Dimensions.get('window');
    const maxWidth = width - (width * 10) / 100;
    let {
      minHeight,
      maxHeight,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      color,
      activeColor,
      fontFamily,
      fontSize,
      fontWeight,
      label,
      labelDuration,
      labelColor,
      labelActiveTop,
      labelActiveColor,
      labelActiveScale,
      placeholder,
      placeholderColor,
      underlineDuration,
      underlineHeight,
      underlineColor,
      underlineActiveColor,
      underlineActiveHeight,
      error,
      errorColor,
      errorPaddingTop,
      errorFontSize,
      containerWidth,
      containerMaxWidth,
      containerMinWidth,
      containerMaxHeight,
      containerMarginBottom,
      RTL,
      leftIcon,
      leftIconSize,
      leftIconColor,
      leftIconType,
      onPressLeftIcon,
      rightIcon,
      rightIconSize,
      rightIconColor,
      rightIconType,
      onPressRightIcon,
      rippleColor,
      ...props
    } = this.props;
    let labelProps = {
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      activeColor,
      fontFamily,
      fontSize,
      fontWeight,
      label,
      labelDuration,
      labelColor,
      labelActiveTop,
      labelActiveColor,
      labelActiveScale,
      focused,
      hasValue,
      error,
      errorColor,
      RTL,
    };
    let placeholderProps = {
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      fontFamily,
      fontSize,
      fontWeight,
      placeholder,
      placeholderColor,
      focused,
      hasValue,
    };
    let underlineProps = {
      activeColor,
      underlineDuration,
      underlineHeight,
      underlineColor,
      underlineActiveColor,
      underlineActiveHeight,
      focused,
      error,
      errorColor,
    };
    let containerStyle = {
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    };
    if (props.multiline && props.height) {
      // Disable autogrow if height prop
      height = props.height;
    }
    let inputStyle = {
      minHeight,
      maxHeight,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      color,
      fontFamily,
      fontWeight,
      marginTop: active ? 20 : 0,
      fontSize: 17,

      // ...Platform.select({
      //   ios: {
      //     height:
      //       paddingTop +
      //       paddingBottom +
      //       (props.multiline ? height : fontSize * 1.5),
      //   },
      //   android: {
      //     height: props.multiline
      //       ? height
      //       : fontSize * 1.5 + paddingTop + paddingBottom,
      //     textAlignVertical: "top",
      //   },
      // }),
    };
    let errorProps = {
      error,
      errorColor,
      errorPaddingTop,
      errorFontSize,
    };
    let containerCustomStyle = {
      width: containerWidth || width,
      maxWidth: containerMaxWidth ? containerMaxWidth : maxWidth,
      minWidth: containerMinWidth ? containerMinWidth : 150,
      maxHeight: containerMaxHeight ? containerMaxHeight : 150,
      marginBottom: containerMarginBottom ? containerMarginBottom : 0,
      marginLeft: width * 0.04,
      marginTop: 12,
    };
    let iconStyle = {
      position: 'absolute',
      zIndex: 5,
      marginLeft: '2%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <View style={[containerCustomStyle]}>
        {leftIcon &&
          this._iconGenerator(
            iconStyle,
            rippleColor,
            !RTL ? leftIconType : rightIconType,
            !RTL ? leftIcon : rightIcon,
            focused && !RTL
              ? labelActiveColor
                ? labelActiveColor
                : '#3f51b5'
              : leftIconColor,
            leftIconSize,
            'left',
            onPressLeftIcon,
            containerWidth ? containerWidth : width,
            maxWidth,
          )}

        {rightIcon &&
          this._iconGenerator(
            iconStyle,
            rippleColor,
            RTL ? leftIconType : rightIconType,
            RTL ? leftIcon : rightIcon,
            focused && RTL
              ? labelActiveColor
                ? labelActiveColor
                : '#3f51b5'
              : rightIconColor,
            rightIconSize,
            'right',
            onPressRightIcon,
            containerWidth ? containerWidth : width,
            maxWidth,
          )}
        <View style={containerStyle}>
          <Label
            {...labelProps}
            paddingRight={iconPaddingRight}
            paddingLeft={iconPaddingLeft}
            fontSize={active ? 22 : 20}
          />
          {placeholder ? <Placeholder {...placeholderProps} /> : null}
          <TextInput
            {...props}
            style={inputStyle}
            ref={'refrance'}
            paddingRight={iconPaddingRight}
            paddingLeft={iconPaddingLeft}
            underlineColorAndroid="transparent"
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onChangeText={this._handleChangeText}
            onContentSizeChange={this._handleContentSizeChange}
            value={value}
          />
          <Underline {...underlineProps} />
          {error ? <ErrorHelper {...errorProps} /> : null}
        </View>
      </View>
    );
  }

  _handleFocus = (...args) => {
    let {onFocus} = this.props;
    this.setState({focused: true});
    onFocus(...args);
  };

  _handleBlur = (...args) => {
    let {onBlur} = this.props;
    this.setState({focused: false});
    onBlur(...args);
  };

  _handleChangeText = (...args) => {
    let {onChangeText, value} = this.props;

    // Make support of uncontrolled component
    if (value == null) {
      this.setState({value: args[0]});
    }

    onChangeText(...args);
  };

  _handleContentSizeChange = event => {
    let {onContentSizeChange, fontSize} = this.props;
    let {height} = event.nativeEvent.contentSize;

    this.setState({
      height: Math.max(fontSize * 1.5, Math.ceil(height)),
    });

    onContentSizeChange(event);
  };

  _iconPaddingLeft() {
    const {leftIcon, leftIconSize, paddingStart, paddingLeft} = this.props;
    let statePaddingLeft = 0;

    if (leftIcon && leftIconSize) {
      statePaddingLeft = leftIconSize + 10;
      this.setState({
        iconPaddingLeft: statePaddingLeft,
      });
    } else if (paddingStart || paddingLeft) {
      statePaddingLeft = paddingStart || paddingLeft;
      this.setState({
        iconPaddingLeft: statePaddingLeft,
      });
    }
  }

  _iconPaddingRight() {
    const {rightIcon, rightIconSize, paddingEnd, paddingRight} = this.props;
    let statePaddingRight = 0;

    if (rightIcon && rightIconSize) {
      statePaddingRight = rightIconSize + 10;
      this.setState({
        iconPaddingRight: statePaddingRight,
      });
    } else if (paddingEnd || paddingRight) {
      statePaddingRight = paddingEnd || paddingRight;
      this.setState({
        iconPaddingRight: statePaddingRight,
      });
    }
  }

  _iconGenerator(
    iconStyle,
    rippleColor,
    iconType,
    iconName,
    iconColor,
    iconSize,
    iconPosition,
    onPressIcon,
    parentWidth,
    maxWidth,
  ) {
    let Type = iconType ? iconType.toLowerCase() : null;

    // get input width to set icon position
    let inputWidth =
      parentWidth < 150 ? 150 : parentWidth > maxWidth ? maxWidth : parentWidth;

    switch (Type) {
      case 'ion':
        return (
          <ClickableView
            rippleColor={rippleColor}
            style={[
              iconStyle,
              {
                width: iconSize,
                left: iconPosition === 'left' ? 0 : inputWidth - iconSize - 5,
                bottom: this.props.error ? 12 : 0,
              },
            ]}>
            <IonIcon
              icon={iconName}
              color={
                this.props.error && iconPosition === 'left'
                  ? this.props.errorColor
                    ? this.props.errorColor
                    : 'red'
                  : iconColor
              }
              size={iconSize}
              onPress={onPressIcon}
            />
          </ClickableView>
        );
      case 'oct':
        return (
          <ClickableView
            rippleColor={rippleColor}
            style={[
              iconStyle,
              {
                width: iconSize,
                left: iconPosition === 'left' ? 0 : inputWidth - iconSize - 10,
                bottom: this.props.error ? 12 : 0,
              },
            ]}>
            <OctIcon
              icon={iconName}
              color={
                this.props.error && iconPosition === 'left'
                  ? this.props.errorColor
                    ? this.props.errorColor
                    : 'red'
                  : iconColor
              }
              size={iconSize}
              onPress={onPressIcon}
            />
          </ClickableView>
        );
      case 'evil':
        return (
          <ClickableView
            rippleColor={rippleColor}
            style={[
              iconStyle,
              {
                width: iconSize,
                left: iconPosition === 'left' ? 0 : inputWidth - iconSize - 10,
                bottom: this.props.error ? 12 : 0,
              },
            ]}>
            <EvilIcon
              icon={iconName}
              color={
                this.props.error && iconPosition === 'left'
                  ? this.props.errorColor
                    ? this.props.errorColor
                    : 'red'
                  : iconColor
              }
              size={iconSize}
              onPress={onPressIcon}
            />
          </ClickableView>
        );
      case 'awesome':
        return (
          <ClickableView
            rippleColor={rippleColor}
            style={[
              iconStyle,
              {
                width: iconSize,
                left: iconPosition === 'left' ? 0 : inputWidth - iconSize - 10,
                bottom: this.props.error ? 12 : 0,
              },
            ]}>
            <AwesomeIcon
              icon={iconName}
              color={
                this.props.error && iconPosition === 'left'
                  ? this.props.errorColor
                    ? this.props.errorColor
                    : 'red'
                  : iconColor
              }
              size={iconSize}
              onPress={onPressIcon}
            />
          </ClickableView>
        );
      case 'material':
        return (
          <ClickableView
            rippleColor={rippleColor}
            style={[
              iconStyle,
              {
                width: iconSize,
                left: iconPosition === 'left' ? 0 : inputWidth - iconSize - 10,
                bottom: this.props.error ? 12 : 0,
              },
            ]}>
            <MaterialDesignIcon
              icon={iconName}
              color={
                this.props.error && iconPosition === 'left'
                  ? this.props.errorColor
                    ? this.props.errorColor
                    : 'red'
                  : iconColor
              }
              size={iconSize}
              onPress={onPressIcon}
            />
          </ClickableView>
        );
      case 'materialicon':
        return (
          <ClickableView
            rippleColor={rippleColor}
            style={[
              iconStyle,
              {
                width: iconSize,
                left: iconPosition === 'left' ? 0 : inputWidth - iconSize - 10,
                bottom: this.props.error ? 12 : 0,
              },
            ]}>
            <MaterialIcon
              icon={iconName}
              color={
                this.props.error && iconPosition === 'left'
                  ? this.props.errorColor
                    ? this.props.errorColor
                    : 'red'
                  : iconColor
              }
              size={iconSize}
              onPress={onPressIcon}
            />
          </ClickableView>
        );
      default:
        return (
          <ClickableView
            rippleColor={rippleColor}
            style={[
              iconStyle,
              {
                width: iconSize,
                left: iconPosition === 'left' ? 0 : inputWidth - iconSize - 10,
                bottom: this.props.error ? 12 : 0,
              },
            ]}>
            <IonIcon
              icon={iconName}
              color={
                this.props.error && iconPosition === 'left'
                  ? this.props.errorColor
                    ? this.props.errorColor
                    : 'red'
                  : iconColor
              }
              size={iconSize}
              onPress={onPressIcon}
            />
          </ClickableView>
        );
    }
  }
}
