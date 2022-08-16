import React from 'react';
import {
    View,
    Text,
    Image,
    Modal,
    Flatlist,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';

import { MotiView, useAnimationState } from 'moti';
import { Shadow } from 'react-native-shadow-2';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    TextButton,
    FormInput,
    IconButton
} from '../../components';
import {
    icons,
    images,
    COLORS,
    FONTS,
    SIZES
} from '../../constants';

const AuthMain = () => {

    // States
    const [mode, setMode] = React.useState("signIn");
    const [isVisible, setIsVisible] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [password, setPassword] = React.useState("");

    // Animation States

    const animationState = useAnimationState({
        signIn: {
            height: SIZES.height * 0.55
        },
        signUp: {
            height: SIZES.height * 0.7
        }
    })

    React.useEffect(() => {
        animationState.transitionTo("signIn")
    }, [])

    // Render

    function renderSignIn() {
        return (
            <MotiView
                state={animationState}
                style={{
                    marginTop: SIZES.padding,
                    height: SIZES.height * 0.55
                }}
            >
                <Shadow>
                    <View
                        style={styles.authContainer}
                    >
                        <Text
                            style={{
                                width: '60%',
                                lineHeight: 45,
                                color: COLORS.dark,
                                ...FONTS.h1
                            }}
                        >
                            Sign in to continue
                        </Text>

                        <KeyboardAwareScrollView
                            enableOnAndroid={true}
                            keyboardDismissMode="on-drag"
                            keyboardShouldPersistTaps={"handled"}
                            extraScrollHeight={-300}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'center'
                            }}
                        >
                            {/* Email */}
                            <FormInput
                                containerStyle={{
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.error
                                }}
                                placeholder="Email"
                                value={email}
                                onChange={(text) => setEmail(text)}
                                prependComponent={
                                    <Image
                                        source={icons.email}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                            />

                            {/* Password */}
                            <FormInput
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.error
                                }}
                                placeholder="Password"
                                value={password}
                                secureTextEntry={!isVisible}
                                onChange={(text) => setPassword(text)}
                                prependComponent={
                                    <Image
                                        source={icons.lock}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                                appendComponent={
                                    <IconButton
                                        icon={isVisible ? icons.eye_off : icons.eye}
                                        iconStyle={{
                                            tintColor: COLORS.grey
                                        }}
                                        onPress={() => setIsVisible(!isVisible)}
                                    />
                                }
                            />

                            <View
                                style={{
                                    alignItems: 'flex-end'
                                }}
                            >
                                <TextButton
                                    label="Forgot Password?"
                                    contentContainerStyle={{
                                        marginTop: SIZES.radius,
                                        backgroundColor: null
                                    }}
                                    labelStyle={{
                                        color: COLORS.support3,
                                        ...FONTS.h4
                                    }}
                                />
                            </View>
                        </KeyboardAwareScrollView>

                        <TextButton
                            label="Log In"
                            contentContainerStyle={{
                                height: 55,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary
                            }}
                            labelStyle={{
                                ...FONTS.h3
                            }}
                            onPress={() => console.log("Log In")}
                        />
                    </View>
                </Shadow>

            </MotiView>
        )
    }

    function renderSignUp() {
        return (
            <MotiView
                state={animationState}
                style={{
                    marginTop: SIZES.padding,
                }}
            >
                <Shadow>
                    <View
                        style={styles.authContainer}
                    >

                    </View>
                </Shadow>

            </MotiView>
        )
    }

    function renderAuthContainer() {
        if (mode == "signIn") {
            return renderSignIn();
        } else {
            return renderSignUp();
        }
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
                backgroundColor: COLORS.lightGrey
            }}
        >
            {/* Logo */}
            <Image
                source={images.logo}
                style={{
                    alignSelf: 'center',
                    marginTop: SIZES.padding * 2,
                    width: 50,
                    height: 50
                }}
            />

            {/* Auth Container */}
            <View>
                {renderAuthContainer()}
            </View>

            <TextButton
                label="Toggle"
                onPress={() => {
                    if (animationState.current === "signIn") {
                        animationState.transitionTo("signUp");
                        setMode("signUp");
                    } else {
                        animationState.transitionTo("signIn");
                        setMode("signIn");
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        width: SIZES.width - (SIZES.padding * 2),
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.light
    }
})

export default AuthMain;