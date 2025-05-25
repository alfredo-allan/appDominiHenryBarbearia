import React, { useEffect, useRef } from "react";
import { Animated, View, Image } from "react-native";
import { styles } from "./styles";

const AnimatedIcon = () => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loopAnimation = () => {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => loopAnimation());
    };

    loopAnimation();
  }, [scale]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/splash.png")}
        style={[styles.icon, { transform: [{ scale }] }]}
      />
    </View>
  );
};

export default AnimatedIcon;
