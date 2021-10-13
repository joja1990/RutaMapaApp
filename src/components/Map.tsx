import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../hooks/UseLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';


export const Map = () => {
    const { initialPosition, hasLocation, getCurrentLocation } = useLocation();

    const mapViewRef = useRef<MapView>();

    const currentPosition = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        });
    }
    if (!hasLocation) {
        return <LoadingScreen />
    }

    return (
        <>
            <MapView
                ref={(el) => mapViewRef.current = el!}
                style={{ flex: 1 }}
                showsUserLocation
                // loadingEnabled 
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* <Marker
                image={require('../assets/custom-marker.png')}

                    coordinate={{

                        latitude: 14.631899,
                        longitude: -90.5037209,


                    }}
                    title={'marker.title'}
                    description={'marker.description'}
                /> */}



            </MapView>
            <Fab
                iconName='compass-outline'
                onPress={currentPosition}
                style={
                    {
                        position: 'absolute',
                        bottom: 20,
                        right: 20
                    }
                }
            />

        </>
    )
}
