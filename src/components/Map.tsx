import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export const Map = () => {
    return (
        <>
            <MapView
                style={{ flex: 1 }}
                showsUserLocation
                loadingEnabled 
                initialRegion={{
                    latitude: 14.6581329,
                    longitude: -90.8606449,
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

        </>
    )
}
