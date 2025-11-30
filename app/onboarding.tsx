import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate, withTiming, withRepeat, runOnJS, Easing } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import useTheme from "@/hooks/useTheme";

const IMAGES = [
    require("../assets/images/1.png"),
    require("../assets/images/2.png"),
    require("../assets/images/3.png"),
];

const PAGES = [
    {
        title: "Capture tasks quickly",
        subtitle: "Add todos in seconds and keep your day organized—fast entry, smart defaults.",
    },
    {
        title: "Organize & prioritize",
        subtitle: "Group tasks, set priorities and deadlines so you focus on what matters.",
    },
    {
        title: "Track progress",
        subtitle: "See completed tasks and progress stats. Sync across devices and stay in control.",
    },
];

export default function Onboarding() {
    const [fontsLoaded] = useFonts({ SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf") });
    const { colors } = useTheme();
    const router = useRouter();
    const { width } = useWindowDimensions();
    const scrollX = useSharedValue(0);
    const floatAnim = useSharedValue(0);
    const scrollRef = useRef<any>(null);
    const arrowScale = useSharedValue(1);

    // Intro (splash-like) animation state
    const [showIntro, setShowIntro] = useState(true);
    const introAnim = useSharedValue(0);

    useEffect(() => {
        // Animate intro logo: scale & fade in then out using Reanimated
        introAnim.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) });
        const timeout = setTimeout(() => {
            introAnim.value = withTiming(0, { duration: 400, easing: Easing.in(Easing.cubic) }, (finished) => {
                if (finished) runOnJS(setShowIntro)(false);
            });
        }, 700 + 500);
        return () => clearTimeout(timeout);
    }, [introAnim]);

    useEffect(() => {
        // continuous subtle float loop for background illusion using Reanimated
        floatAnim.value = withRepeat(withTiming(1, { duration: 5000, easing: Easing.inOut(Easing.quad) }), -1, true);
    }, [floatAnim]);

    // animated styles for intro splash (used while showIntro is true)
    const introStyle = useAnimatedStyle(() => {
        const scale = interpolate(introAnim.value, [0, 1], [0.8, 1.1], Extrapolate.CLAMP);
        const opacity = introAnim.value;
        return { transform: [{ scale }], opacity };
    });

    const bgLargeStyle = useAnimatedStyle(() => ({ opacity: interpolate(introAnim.value, [0, 1], [0.25, 0.6], Extrapolate.CLAMP) }));
    const bgSmallStyle = useAnimatedStyle(() => ({ opacity: interpolate(introAnim.value, [0, 1], [0.12, 0.4], Extrapolate.CLAMP) }));

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    // Precompute per-page animated styles (explicit calls so hooks are top-level)
    const imageStyles = [
        useAnimatedStyle(() => {
            const inputRange = [(-1) * width, 0 * width, 1 * width];
            const scale = interpolate(scrollX.value, inputRange, [0.9, 1, 0.9], Extrapolate.CLAMP);
            const translateY = interpolate(scrollX.value, inputRange, [40, 0, 40], Extrapolate.CLAMP);
            const opacity = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], Extrapolate.CLAMP);
            return { transform: [{ scale }, { translateY }], opacity };
        }),
        useAnimatedStyle(() => {
            const inputRange = [0 * width, 1 * width, 2 * width];
            const scale = interpolate(scrollX.value, inputRange, [0.9, 1, 0.9], Extrapolate.CLAMP);
            const translateY = interpolate(scrollX.value, inputRange, [40, 0, 40], Extrapolate.CLAMP);
            const opacity = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], Extrapolate.CLAMP);
            return { transform: [{ scale }, { translateY }], opacity };
        }),
        useAnimatedStyle(() => {
            const inputRange = [1 * width, 2 * width, 3 * width];
            const scale = interpolate(scrollX.value, inputRange, [0.9, 1, 0.9], Extrapolate.CLAMP);
            const translateY = interpolate(scrollX.value, inputRange, [40, 0, 40], Extrapolate.CLAMP);
            const opacity = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], Extrapolate.CLAMP);
            return { transform: [{ scale }, { translateY }], opacity };
        }),
    ];

    const illusionStyles = [
        useAnimatedStyle(() => ({ transform: [{ rotate: `${interpolate(scrollX.value, [(-1) * width, 0 * width, 1 * width], [-10, 0, 10], Extrapolate.CLAMP)}deg` }], opacity: interpolate(scrollX.value, [(-1) * width, 0 * width, 1 * width], [0.6, 1, 0.6], Extrapolate.CLAMP) })),
        useAnimatedStyle(() => ({ transform: [{ rotate: `${interpolate(scrollX.value, [0 * width, 1 * width, 2 * width], [-10, 0, 10], Extrapolate.CLAMP)}deg` }], opacity: interpolate(scrollX.value, [0 * width, 1 * width, 2 * width], [0.6, 1, 0.6], Extrapolate.CLAMP) })),
        useAnimatedStyle(() => ({ transform: [{ rotate: `${interpolate(scrollX.value, [1 * width, 2 * width, 3 * width], [-10, 0, 10], Extrapolate.CLAMP)}deg` }], opacity: interpolate(scrollX.value, [1 * width, 2 * width, 3 * width], [0.6, 1, 0.6], Extrapolate.CLAMP) })),
    ];

    const floatingDotStyles = [
        useAnimatedStyle(() => ({ transform: [{ translateX: interpolate(scrollX.value, [(-1) * width, 0 * width, 1 * width], [-20, 0, 20], Extrapolate.CLAMP) }, { translateY: interpolate(floatAnim.value, [0, 1], [-6, 6], Extrapolate.CLAMP) }], opacity: interpolate(scrollX.value, [(-1) * width, 0 * width, 1 * width], [0.6, 1, 0.6], Extrapolate.CLAMP) })),
        useAnimatedStyle(() => ({ transform: [{ translateX: interpolate(scrollX.value, [0 * width, 1 * width, 2 * width], [-20, 0, 20], Extrapolate.CLAMP) }, { translateY: interpolate(floatAnim.value, [0, 1], [-6, 6], Extrapolate.CLAMP) }], opacity: interpolate(scrollX.value, [0 * width, 1 * width, 2 * width], [0.6, 1, 0.6], Extrapolate.CLAMP) })),
        useAnimatedStyle(() => ({ transform: [{ translateX: interpolate(scrollX.value, [1 * width, 2 * width, 3 * width], [-20, 0, 20], Extrapolate.CLAMP) }, { translateY: interpolate(floatAnim.value, [0, 1], [-6, 6], Extrapolate.CLAMP) }], opacity: interpolate(scrollX.value, [1 * width, 2 * width, 3 * width], [0.6, 1, 0.6], Extrapolate.CLAMP) })),
    ];

    const dotIndicatorStyles = [
        useAnimatedStyle(() => ({ width: interpolate(scrollX.value, [(-1) * width, 0 * width, 1 * width], [8, 16, 8], Extrapolate.CLAMP), opacity: interpolate(scrollX.value, [(-1) * width, 0 * width, 1 * width], [0.4, 1, 0.4], Extrapolate.CLAMP) })),
        useAnimatedStyle(() => ({ width: interpolate(scrollX.value, [0 * width, 1 * width, 2 * width], [8, 16, 8], Extrapolate.CLAMP), opacity: interpolate(scrollX.value, [0 * width, 1 * width, 2 * width], [0.4, 1, 0.4], Extrapolate.CLAMP) })),
        useAnimatedStyle(() => ({ width: interpolate(scrollX.value, [1 * width, 2 * width, 3 * width], [8, 16, 8], Extrapolate.CLAMP), opacity: interpolate(scrollX.value, [1 * width, 2 * width, 3 * width], [0.4, 1, 0.4], Extrapolate.CLAMP) })),
    ];

    const titleStyles = [
        useAnimatedStyle(() => {
            const inputRange = [(-1) * width, 0 * width, 1 * width];
            const ty = interpolate(scrollX.value, inputRange, [20, 0, -20], Extrapolate.CLAMP);
            const op = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], Extrapolate.CLAMP);
            return { transform: [{ translateY: ty }], opacity: op };
        }),
        useAnimatedStyle(() => {
            const inputRange = [0 * width, 1 * width, 2 * width];
            const ty = interpolate(scrollX.value, inputRange, [20, 0, -20], Extrapolate.CLAMP);
            const op = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], Extrapolate.CLAMP);
            return { transform: [{ translateY: ty }], opacity: op };
        }),
        useAnimatedStyle(() => {
            const inputRange = [1 * width, 2 * width, 3 * width];
            const ty = interpolate(scrollX.value, inputRange, [20, 0, -20], Extrapolate.CLAMP);
            const op = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], Extrapolate.CLAMP);
            return { transform: [{ translateY: ty }], opacity: op };
        }),
    ];

    const arrowStyle = useAnimatedStyle(() => ({ transform: [{ scale: arrowScale.value }] }));

    const handleFinish = () => {
        // Replace onboarding so user won't go back to it with back button
        router.replace("/(tabs)");
    };

    const goToPage = (idx: number) => {
        try {
            // react-native Animated / Reanimated wrapped ScrollView may expose scrollTo directly or via getNode()
            if (scrollRef.current) {
                if (typeof scrollRef.current.scrollTo === "function") {
                    scrollRef.current.scrollTo({ x: idx * width, y: 0, animated: true });
                    return;
                }
                // some RN wrappers require getNode()
                if (typeof scrollRef.current.getNode === "function") {
                    const node = scrollRef.current.getNode();
                    if (node && typeof node.scrollTo === "function") {
                        node.scrollTo({ x: idx * width, y: 0, animated: true });
                        return;
                    }
                }
            }
        } catch (e) {
            // swallow errors but log to console for debugging
            console.warn("goToPage scrollTo failed:", e);
        }
    };

    const handleArrowPress = (idx: number) => {
        // small press animation then navigate to next page or finish
        arrowScale.value = withTiming(1.15, { duration: 120 });
        setTimeout(() => {
            arrowScale.value = withTiming(1, { duration: 120 });
            const next = idx + 1;
            if (idx >= IMAGES.length - 1) {
                // last page -> finish
                router.replace("/(tabs)");
            } else {
                goToPage(next);
            }
        }, 140);
    };

    if (!fontsLoaded) return null;

    // While intro is visible, show animated logo over the illusion background
    if (showIntro) {
        return (
            <View style={[styles.container, { backgroundColor: colors.surface }]}>
                {/* Illusion background - subtle, matches todo app */}
                <Animated.View style={[styles.bgCircleLarge, bgLargeStyle]} />
                <Animated.View style={[styles.bgCircleSmall, bgSmallStyle]} />

                <View style={styles.introCenter} pointerEvents="none">
                    <Animated.Image source={require("../assets/images/icon.png")} style={[styles.introLogo, introStyle]} resizeMode="contain" />
                </View>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.replace("/(tabs)")} style={styles.skipButton}>
                    <Text style={[styles.skipText, { color: colors.textMuted }]}>Skip</Text>
                </TouchableOpacity>
            </View>

            <Animated.ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                style={{ flex: 1 }}
            >
                {IMAGES.map((src, i) => {
                    return (
                        <View key={i} style={[styles.page, { width }]}>
                            <View style={styles.imageWrap}>
                                <Animated.Image source={src} style={[styles.imageMedium, imageStyles[i]]} resizeMode="cover" />
                                <LinearGradient colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.05)"]} style={styles.gradient} />
                                {/* Illusion overlay: subtle rotating translucent circle */}
                                <Animated.View pointerEvents="none" style={[styles.illusion, illusionStyles[i]]} />
                                <Animated.View style={[styles.floatingDot, floatingDotStyles[i]]} />
                            </View>

                            <View style={styles.captionContainer}>
                                <Animated.View style={titleStyles[i]}>
                                    <Text style={[styles.title, { color: colors.text, fontFamily: "SpaceMono" }]}>{PAGES[i].title}</Text>
                                </Animated.View>
                                <Animated.View style={titleStyles[i]}>
                                    <Text style={[styles.subtitle, { color: colors.textMuted, fontFamily: "SpaceMono" }]}>{PAGES[i].subtitle}</Text>
                                </Animated.View>
                                {i === IMAGES.length - 1 ? (
                                    <TouchableOpacity onPress={handleFinish} style={[styles.cta, { backgroundColor: colors.primary }]}>
                                        <Text style={styles.ctaText}>Get Started</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <Pressable
                                        onPress={() => handleArrowPress(i)}
                                        onPressIn={() => { arrowScale.value = withTiming(1.08, { duration: 100 }); }}
                                        onPressOut={() => { arrowScale.value = withTiming(1, { duration: 120 }); }}
                                        onHoverIn={() => { arrowScale.value = withTiming(1.08, { duration: 100 }); }}
                                        onHoverOut={() => { arrowScale.value = withTiming(1, { duration: 120 }); }}
                                        style={styles.arrowTouchable}
                                    >
                                        <Animated.View style={[styles.arrowContainer, arrowStyle]}>
                                            <Text style={styles.arrowText}>→</Text>
                                        </Animated.View>
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    );
                })}
            </Animated.ScrollView>

            {/* Dots indicator */}
            <View style={styles.dots}>
                {IMAGES.map((_, i) => (
                    <Animated.View key={i} style={[styles.dot, dotIndicatorStyles[i]]} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    topBar: { height: 64, justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 20 },
    skipButton: { padding: 8 },
    skipText: { fontSize: 16, fontWeight: "600" },
    page: { flex: 1, justifyContent: "center", alignItems: "center" },
    image: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined },
    imageWrap: { width: "92%", height: 360, borderRadius: 18, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.12)", marginTop: 12 },
    imageMedium: { width: "100%", height: "100%" },
    gradient: { ...StyleSheet.absoluteFillObject },
    illusion: {
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "rgba(255,255,255,0.06)",
        top: 80,
        left: 40,
    },
    bgCircleLarge: { position: "absolute", width: 520, height: 520, borderRadius: 260, backgroundColor: "rgba(2,132,199,0.12)", top: -80, right: -120 },
    bgCircleSmall: { position: "absolute", width: 300, height: 300, borderRadius: 150, backgroundColor: "rgba(59,130,246,0.08)", bottom: -40, left: -60 },
    introCenter: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" },
    introLogo: { width: 140, height: 140, borderRadius: 22 },
    floatingDot: { position: 'absolute', width: 14, height: 14, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.5)', top: 28, right: 28, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3, elevation: 3 },
    captionContainer: { position: "absolute", bottom: 48, left: 20, right: 20, alignItems: "center" },
    arrowTouchable: { marginTop: 12 },
    arrowContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.12)', justifyContent: 'center', alignItems: 'center' },
    arrowText: { color: 'white', fontSize: 28, lineHeight: 28, fontWeight: '700' },
    logo: { width: 96, height: 96, marginBottom: 12, borderRadius: 20 },
    title: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
    subtitle: { fontSize: 14, textAlign: "center", maxWidth: 320, marginBottom: 16 },
    cta: { paddingVertical: 12, paddingHorizontal: 32, borderRadius: 999 },
    ctaText: { color: "white", fontWeight: "700" },
    dots: { height: 64, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 },
    dot: { height: 8, borderRadius: 8, backgroundColor: "white", marginHorizontal: 6 },
});
