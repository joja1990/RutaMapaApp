import React, { createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { check, PERMISSIONS, PermissionStatus, request,openSettings } from "react-native-permissions";

export interface PermissionsState {
    locationStatus: PermissionStatus
}
export const PermissionInitState: PermissionsState = {
    locationStatus: 'unavailable'
}

type PermissionContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionsContext = createContext({} as PermissionContextProps)

export const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState(PermissionInitState);

    useEffect(() => {
        AppState.addEventListener('change', state => {
            if (state !== 'active') return;
            checkLocationPermission();
        })
    })

    const askLocationPermission = async () => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS == 'ios') {
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        }
        else {
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        }
        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        }
        )
        if(permissions.locationStatus==='blocked'){
            openSettings();
        }
        console.log(permissionStatus);


    };
    const checkLocationPermission = async () => {

        let permissionStatus: PermissionStatus;
        if (Platform.OS == 'ios') {
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        }
        else {
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        }
        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        }
        )
        console.log(permissionStatus);
    };


    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission

        }}>
            {children}
        </PermissionsContext.Provider>
    )
}