import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

// Define variant types
type ThreeDButtonVariant =
  | "ai"
  | "default"
  | "destructive"
  | "outline"
  | "outline_destructive"
  | "secondary"
  | "ghost"
  | "ghost_destructive"
  | "link"
  | "solid";

type ThreeDButtonSize = "default" | "sm" | "lg" | "xs" | "icon";

interface ThreeDButtonProps extends Omit<TouchableOpacityProps, "style"> {
  variant?: ThreeDButtonVariant;
  size?: ThreeDButtonSize;
  children?: React.ReactNode;
  stretch?: boolean;
  supportIcon?: keyof typeof Ionicons.glyphMap;
  leadingIcon?: keyof typeof Ionicons.glyphMap;
  isLoading?: boolean;
  style?: ViewStyle;
}

// Variant styles
const variantStyles: Record<
  ThreeDButtonVariant,
  { container: ViewStyle; text: TextStyle }
> = {
  ai: {
    container: {
      backgroundColor: "#6366f1",
      borderColor: "#4f46e5",
      borderBottomWidth: 4,
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    text: {
      color: "#ffffff",
    },
  },
  default: {
    container: {
      backgroundColor: "#3b82f6",
      borderColor: "#2563eb",
      borderBottomWidth: 4,
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    text: {
      color: "#ffffff",
    },
  },
  destructive: {
    container: {
      backgroundColor: "#ef4444",
      borderColor: "#dc2626",
      borderBottomWidth: 4,
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    text: {
      color: "#ffffff",
    },
  },
  outline: {
    container: {
      backgroundColor: "#ffffff",
      borderColor: "#d4d4d8",
      borderBottomColor: "#e4e4e7",
      borderBottomWidth: 4,
      borderWidth: 1,
    },
    text: {
      color: "#18181b",
    },
  },
  outline_destructive: {
    container: {
      backgroundColor: "#ffffff",
      borderColor: "#dc2626",
      borderBottomColor: "#ef4444",
      borderBottomWidth: 4,
      borderWidth: 1,
    },
    text: {
      color: "#ef4444",
    },
  },
  secondary: {
    container: {
      backgroundColor: "#f4f4f5",
      borderWidth: 0,
    },
    text: {
      color: "#18181b",
    },
  },
  ghost: {
    container: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    text: {
      color: "#18181b",
    },
  },
  ghost_destructive: {
    container: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    text: {
      color: "#ef4444",
    },
  },
  link: {
    container: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    text: {
      color: "#3b82f6",
      textDecorationLine: "underline",
    },
  },
  solid: {
    container: {
      backgroundColor: "#27272a",
      borderWidth: 0,
    },
    text: {
      color: "#ffffff",
    },
  },
};

// Size styles
const sizeStyles: Record<
  ThreeDButtonSize,
  { container: ViewStyle; text: TextStyle; icon: number }
> = {
  default: {
    container: {
      height: 40,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    text: {
      fontSize: 14,
    },
    icon: 18,
  },
  sm: {
    container: {
      height: 36,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    text: {
      fontSize: 14,
    },
    icon: 16,
  },
  lg: {
    container: {
      height: 44,
      paddingHorizontal: 32,
      borderRadius: 12,
    },
    text: {
      fontSize: 16,
    },
    icon: 20,
  },
  xs: {
    container: {
      height: 32,
      paddingHorizontal: 16,
      borderRadius: 6,
    },
    text: {
      fontSize: 12,
    },
    icon: 14,
  },
  icon: {
    container: {
      height: 40,
      width: 40,
      paddingHorizontal: 0,
    },
    text: {
      fontSize: 14,
    },
    icon: 20,
  },
};

export const ThreeDButton = React.forwardRef<View, ThreeDButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      children,
      stretch = false,
      supportIcon,
      leadingIcon,
      isLoading = false,
      disabled = false,
      style,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handlePressIn = (e: any) => {
      scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
      onPressIn?.(e);
    };

    const handlePressOut = (e: any) => {
      scale.value = withSpring(1, { damping: 15, stiffness: 400 });
      onPressOut?.(e);
    };

    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];
    const iconSize = sizeStyle.icon;
    const iconColor = variantStyle.text.color;

    return (
      <AnimatedTouchableOpacity
        ref={ref as any}
        disabled={disabled || isLoading}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          variantStyle.container,
          sizeStyle.container,
          stretch && styles.stretch,
          (disabled || isLoading) && styles.disabled,
          animatedStyle,
          style,
        ]}
        activeOpacity={0.8}
        {...props}
      >
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator size="small" color={iconColor} />
          ) : supportIcon ? (
            <Ionicons name={supportIcon} size={iconSize} color={iconColor} />
          ) : null}

          {typeof children === "string" ? (
            <Text style={[styles.text, variantStyle.text, sizeStyle.text]}>
              {children}
            </Text>
          ) : (
            children
          )}

          {leadingIcon && !isLoading && (
            <Ionicons name={leadingIcon} size={iconSize} color={iconColor} />
          )}
        </View>
      </AnimatedTouchableOpacity>
    );
  }
);

ThreeDButton.displayName = "ThreeDButton";

// ThreeDButtonGroup Component
interface ThreeDButtonGroupProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ThreeDButtonGroup: React.FC<ThreeDButtonGroupProps> = ({
  children,
  style,
}) => {
  return (
    <View style={[styles.buttonGroup, style]}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <View
              style={[
                styles.buttonGroupItem,
                index > 0 && styles.buttonGroupDivider,
              ]}
            >
              {React.cloneElement(child as React.ReactElement<any>, {
                style: [(child.props as any).style, styles.buttonGroupButton],
              })}
            </View>
          );
        }
        return child;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    fontWeight: "600",
  },
  stretch: {
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonGroup: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d4d4d8",
  },
  buttonGroupItem: {
    flex: 1,
  },
  buttonGroupDivider: {
    borderLeftWidth: 1,
    borderLeftColor: "#d4d4d8",
  },
  buttonGroupButton: {
    borderRadius: 0,
    borderWidth: 0,
  },
});

// Helper function to get button styles programmatically
export const threeDButtonVariants = (config?: {
  variant?: ThreeDButtonVariant;
  size?: ThreeDButtonSize;
}) => {
  const variant = config?.variant || "default";
  const size = config?.size || "default";

  return {
    ...variantStyles[variant].container,
    ...sizeStyles[size].container,
  };
};

// Export types
export type {
  ThreeDButtonProps,
  ThreeDButtonVariant,
  ThreeDButtonSize,
  ThreeDButtonGroupProps,
};
