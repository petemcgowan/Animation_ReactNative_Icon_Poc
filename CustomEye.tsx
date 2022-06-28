import React, {Fragment, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeIn,
  FadeInRight,
  ZoomOut,
  ZoomOutRotate,
} from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Ionicons';

interface AnimatedBlockProps {
  name: string;
  animatedStyle: Record<string, any>;
  defaultShow?: boolean;
}

const AnimatedBlock = ({
  name,
  animatedStyle,
  defaultShow,
}: AnimatedBlockProps) => {
  const [show, setShow] = useState(defaultShow);
  return (
    <View style={styles.animatedBox}>
      {show ? (
        <TouchableWithoutFeedback onPress={() => setShow(!show)}>
          <Animated.View style={styles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>{name}</Text>
            <Icon name="ios-eye" size={18} style={styles.searchIcon} />
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : null}
      {!show ? (
        <Animated.View
          entering={
            'entering' in animatedStyle ? undefined : FadeIn.delay(350)
          }>
          <TouchableOpacity
            style={styles.animatedBlockPlaceholder}
            onPress={() => setShow(!show)}>
            <Text style={styles.animatedTextPlaceholder}>{name}</Text>
            <Icon name="ios-eye" size={18} style={styles.searchIcon} />
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </View>
  );
};

const CustomEye = () => {
  const InputLength = useSharedValue({width: '50%'});
  const inputRef = useRef<any>(null);

  const SearchTextPlacement = useSharedValue({
    transformX: (Dimensions.get('window').width - 100) / 2,
  });

  // const CancelBtn = useSharedValue({transformX: 100});

  const InputLengthStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(InputLength.value.width, {
        duration: 250,
      }),
    };
  });

  const SearchTextPlacementStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(SearchTextPlacement.value.transformX, {
            duration: 250,
          }),
        },
      ],
    };
  });

  // const CancelBtnStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {translateX: withTiming(CancelBtn.value.transformX, {duration: 250})},
  //     ],
  //   };
  // });

  const onFocus = () => {
    InputLength.value = {width: '50%'};
    SearchTextPlacement.value = {transformX: 0};
    // CancelBtn.value = {transformX: 0};
  };

  const onCancelAnimation = () => {
    InputLength.value = {width: '20%'};
    SearchTextPlacement.value = {
      transformX: (Dimensions.get('window').width - 140) / 2,
    };
    // CancelBtn.value = {transformX: 100};
    inputRef.current.blur();
  };

  return (
    <View>
    <View style={styles.searchTopContainer}>
      {/* Added InputLengthStyles animated styles */}
      <Animated.View style={[styles.searchContainer, InputLengthStyles]}>
        {/* Added SearchTextPlacementStyles animated styles */}
        <Animated.View style={[styles.search, SearchTextPlacementStyles]}>
          <Icon name="ios-eye" size={18} style={styles.searchIcon} />
          {/* TextInput */}
          <TextInput
            placeholder={'Search'}
            style={{fontSize: 16, paddingRight: 20}}
            onFocus={onFocus}
            ref={inputRef}
          />
        </Animated.View>
      </Animated.View>

      {/* Cancel button */}
      {/* Added CancelBtnStyles animated styles */}
      {/* <Animated.View style={[styles.cancelBtnContainer, CancelBtnStyles]}>
        <TouchableOpacity onPress={onCancelAnimation}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </Animated.View> */}
    </View>
    <Fragment>
      <Text style={styles.groupText}>Fade in</Text>
      <AnimatedBlock name="FadeIn" animatedStyle={{ entering: FadeIn }}/>
      <AnimatedBlock
        name="FadeInRight"
        animatedStyle={{ entering: FadeInRight }}
      />
      <AnimatedBlock
        name="ZoomOut"
        animatedStyle={{ exiting: ZoomOut }}
        defaultShow={true}
      />
      <AnimatedBlock
        name="ZoomOutRotate"
        animatedStyle={{ exiting: ZoomOutRotate }}
        defaultShow={true}
      />

      </Fragment>
      </View>
  );
};

export default CustomEye;

const styles = StyleSheet.create({
  groupText: {
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
  },
  searchTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  searchContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 14,
    borderRadius: 12,
  },
  search: {
    flexDirection: 'row',
  },
  searchIcon: {
    marginRight: 4,
  },
  cancelBtnContainer: {
    // marginLeft: 5,
    marginTop: 10,
  },
  animatedBox: {
    padding: 5,
    alignItems: 'center',
  },
  animatedBlock: {
    height: 60,
    width: 300,
    borderWidth: 3,
    borderColor: '#001a72',
    backgroundColor: '#001a72',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedTextPlaceholder: {
    color: '#001a72',
    fontSize: 20,
  },
  animatedBlockPlaceholder: {
    height: 60,
    width: 300,
    borderWidth: 3,
    borderColor: '#001a72',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  animatedText: {
    color: '#ffffff',
    fontSize: 20,
  },
});