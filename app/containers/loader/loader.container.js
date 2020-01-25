import React, {Component} from 'react';
import {View,  Animated} from 'react-native';
import {width, flex, height} from '../../theme/consts.theme';

class LoaderComponent extends Component {

state = {
    animation: new Animated.Value(1)
}

componentDidMount() {
    this.startAnimation()
}

componentWillUnmount() {
    this.finishAnimation()
}

startAnimation = () => {
    const { animation } = this.state;
    Animated.loop(
        Animated.sequence([
            Animated.timing(animation, {
                toValue: 1.3,
                duration: 500
            }),
            Animated.timing(animation, {
                toValue: 1.0,
                duration: 300
            })
        ])
    ).start()
    
}

finishAnimation = () => {
    const { animation } = this.state;
    Animated.timing(animation,{
        toValue: 10,
        duration: 600
    }).start()
}

    render() {
        const { animation } = this.state;
        const shadowRadius = animation.interpolate({
            inputRange: [1, 1.3],
            outputRange: [1,10]
        })
        const shadowOpacity = animation.interpolate({
            inputRange: [1, 1.3],
            outputRange: [1, .3]
        })
        const scaleAnimation = {
            shadowRadius,
            shadowOpacity,
            transform: [
                {
                    scale: animation
                }
            ]
        }
        return(
            <View style={styles.container}>
                <Animated.Image
                    source={require('../../theme/images/stocklist-logo.png')}
                    style={[styles.image, scaleAnimation]}
                />
            </View>
        )
    }
}

const styles = {
    container: {
        width: width['100'],
        height: height['100'],
        ...flex.centered,
        backgroundColor: 'rgba(1,1,1,.1)',
        position: 'absolute',
        top: 0,
        left: 0
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
        shadowColor: 'black',
        shadowOffset: {x:1, y: 1},
        borderRadius: 50
    }
}

export default LoaderComponent;