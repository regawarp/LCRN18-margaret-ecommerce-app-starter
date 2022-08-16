import { Link, NavigationContainer } from '@react-navigation/native';
import react from 'react';
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { MotiView, useAnimationState } from 'moti';
import { Shadow } from 'react-native-shadow-2';

import {
    IconButton,
    TextButton
} from '../../components';

import {
    COLORS,
    SIZES,
    FONTS,
    icons,
    constants,
    images
} from '../../constants';

const ScanProduct = ({ navigation }) => {

    // State
    const [selectedOptions, setSelectedOptions] = React.useState(constants.scan_product_option.camera);

    // Camera
    const devices = useCameraDevices();
    const device = devices.back;

    // Moti
    const loaderAnimationState = useAnimationState({
        start: {
            opacity: 1
        },
        stop: {
            opacity: 0
        }
    });

    const productAnimationState = useAnimationState({
        hide: {
            opacity: 0,
            tranlateY: -10
        },
        show: {
            opacity: 1,
            tranlateY: 10
        }
    });

    React.useEffect(() => {
        // Animation
        productAnimationState.transitionTo('hide');
        loaderAnimationState.transitionTo('stop');

        // Permission
        requestCameraPermission();
    }, [])

    // Handler
    const requestCameraPermission = React.useCallback(async () => {
        const permission = await Camera.requestCameraPermission();

        if (permission === 'denied') await Linking.openSettings();
    }, [])

    // Render
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingTop: SIZES.padding * 2,
                    paddingBottom: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center',
                    backgroundColor: COLORS.light,
                    zIndex: 1
                }}
            >
                {/* Close */}
                <IconButton
                    icon={icons.close}
                    onPress={() => navigation.goBack()}
                />

                {/* Title */}
                <Text
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        ...FONTS.h2
                    }}
                >
                    {selectedOptions == constants.scan_product_option.camera ? "Scan Camera" : "Scan QR Code"}
                </Text>

                {/* Add. Options */}
                <IconButton
                    icon={icons.flash}
                    iconStyle={{
                        width: 25,
                        height: 25,
                    }}
                />

                <IconButton
                    icon={icons.question_mark}
                    containerStyle={{
                        marginLeft: SIZES.base
                    }}
                    iconStyle={{
                        width: 25,
                        height: 25
                    }}
                />
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 90,
                    paddingTop: SIZES.radius,
                    paddingHorizontal: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                <TextButton
                    label="Scan QR Code"
                    contentContainerStyle={{
                        flex: 1,
                        height: 55,
                        borderRadius: SIZES.radius,
                        backgroundColor: selectedOptions == constants.scan_product_option.qr ? COLORS.primary : COLORS.lightGrey
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        color: selectedOptions == constants.scan_product_option.qr ? COLORS.secondary : COLORS.primary
                    }}
                    onPress={() => {
                        setSelectedOptions(constants.scan_product_option.qr);
                    }}
                />

                <TextButton
                    label="Scan Camera"
                    contentContainerStyle={{
                        flex: 1,
                        height: 55,
                        marginLeft: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: selectedOptions == constants.scan_product_option.camera ? COLORS.primary : COLORS.lightGrey
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        color: selectedOptions == constants.scan_product_option.camera ? COLORS.secondary : COLORS.primary
                    }}
                    onPress={() => {
                        setSelectedOptions(constants.scan_product_option.camera);
                    }}
                />
            </View>
        )
    }

    function renderCamera() {
        if (device == null) {
            return (
                <View
                    style={{
                        flex: 1
                    }}
                >

                </View>
            )
        } else {
            return (
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Camera
                        style={{
                            flex: 1
                        }}
                        device={device}
                        isActive={true}
                        enableZoomGesture
                    />

                    {/* Loading / Searching View */}
                    <MotiView
                        state={loaderAnimationState}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.dark60
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h2,
                                color: COLORS.light
                            }}
                        >
                            Searching
                        </Text>
                    </MotiView>

                    {/* Scan Button */}
                    {selectedOptions == constants.scan_product_option.camera &&
                        <View
                            style={{
                                position: 'absolute',
                                alignItems: 'center',
                                bottom: SIZES.padding,
                                left: 0,
                                right: 0
                            }}
                        >
                            <IconButton
                                icon={icons.scan}
                                containerStyle={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.light
                                }}
                                iconStyle={{
                                    width: 50,
                                    height: 50,
                                    tintColor: COLORS.primary
                                }}
                                onPress={() => {
                                    loaderAnimationState.transitionTo('start');
                                    productAnimationState.transitionTo('hide');
                                    setTimeout(() => {
                                        loaderAnimationState.transitionTo('stop');
                                        productAnimationState.transitionTo('show');
                                    }, 2000)
                                }}
                            />
                        </View>
                    }

                    {/* Product */}
                    <MotiView
                        state={productAnimationState}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 120,
                            paddingVertical: SIZES.radius,
                            alignItems: 'center',
                            zIndex: 1
                        }}
                    >
                        <Shadow>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    width: SIZES.width - (SIZES.padding * 2),
                                    alignItems: 'center',
                                    paddingHorizontal: SIZES.radius,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.light
                                }}
                            >
                                {/* Image */}
                                <Image
                                    source={images.luggage_01}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30
                                    }}
                                />

                                {/* Product name & SKU */}
                                <View
                                    style={{
                                        flex:1,
                                        marginLeft:SIZES.radius
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.h3,
                                            color: COLORS.primary
                                        }}
                                    >
                                        Vali Sakos
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.body4
                                        }}
                                    >
                                        SKU: SD22312
                                    </Text>
                                </View>

                                {/* Price */}
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        color:COLORS.primary
                                    }}
                                >
                                    $ 67.00
                                </Text>
                            </TouchableOpacity>
                        </Shadow>
                    </MotiView>
                </View>
            )
        }
    }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Camera */}
            {renderCamera()}

            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

export default ScanProduct;