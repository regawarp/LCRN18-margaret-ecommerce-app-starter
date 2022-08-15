import { MotiImage } from 'moti';
import { useDynamicAnimation } from 'moti';
import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

import { SIZES, images } from '../../constants';

const Walkthrough3 = ({ animate }) => {

    // Moti initial position
    const motiImage1 = useDynamicAnimation(() => ({
        top: '30%',
        left: '25%'
    }))
    const motiImage2 = useDynamicAnimation(() => ({
        top: '45%',
        left: '15%'
    }))
    const motiImage3 = useDynamicAnimation(() => ({
        top: '58%',
        left: '25%'
    }))
    const motiImage4 = useDynamicAnimation(() => ({
        top: '61%',
        left: '40%'
    }))

    React.useEffect(() => {
        if (animate) {
            motiImage1.animateTo({
                top: '20%',
                left: '15%'
            })

            motiImage2.animateTo({
                top: '38%',
                left: -10
            })

            motiImage3.animateTo({
                top: '62%',
                left: '5%'
            })

            motiImage4.animateTo({
                top: '75%',
                left: '40%'
            })
        }
    }, [animate])

    return (
        <View
            style={{
                flex: 1,
                overflow: 'hidden'
            }}
        >
            <MotiImage
                state={motiImage1}
                source={images.walkthrough_03_01}
                style={{
                    ...styles.image
                }}
            />
            <MotiImage
                state={motiImage2}
                source={images.walkthrough_03_02}
                style={{
                    ...styles.image
                }}
            />
            <MotiImage
                state={motiImage3}
                source={images.walkthrough_01_01}
                style={{
                    ...styles.image
                }}
            />
            <MotiImage
                state={motiImage4}
                source={images.walkthrough_01_02}
                style={{
                    ...styles.image
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        width: 86,
        height: 60,
        zIndex: 0,
        borderRadius: SIZES.radius
    }
})

export default Walkthrough3;