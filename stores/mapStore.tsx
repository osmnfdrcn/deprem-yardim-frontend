import { AhbapData } from "@/components/UI/Drawer/components/types";
import { LatLngBounds } from "leaflet";
import { create } from "zustand";
import {
  ClusterPopupData,
  CoordinatesURLParametersWithEventType,
  MarkerData,
  EVENT_TYPES,
  DeviceType,
} from "../mocks/types";

interface MapState {
  popUpData: ClusterPopupData | null;
  drawerData: MarkerData | AhbapData | null;
  isDrawerOpen: boolean;
  coordinates?: CoordinatesURLParametersWithEventType;
  device: DeviceType;
  markerData: MarkerData[];
  actions: {
    toggleDrawer: () => void;
    setDrawerData: (_data: MarkerData | AhbapData) => void;
    setPopUpData: (_data: ClusterPopupData | null) => void;
    setCoordinates: (_data: LatLngBounds, _eventType: EVENT_TYPES) => void;
    setDevice: (_device: DeviceType) => void;
    setMarkerData: (_data: MarkerData[]) => void;
  };
}

export const useMapStore = create<MapState>()((set) => ({
  drawerData: null,
  popUpData: null,
  isDrawerOpen: false,
  coordinates: undefined,
  device: "desktop",
  markerData: [],
  actions: {
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    setDrawerData: (data: MarkerData | AhbapData) =>
      set(() => ({ drawerData: data })),
    setPopUpData: (data: ClusterPopupData | null) =>
      set(() => ({ popUpData: data })),
    setCoordinates: (data: LatLngBounds, eventType: EVENT_TYPES) =>
      set(() => ({
        coordinates: {
          eventType,
          ne_lat: data.getNorthEast().lat,
          ne_lng: data.getNorthEast().lng,
          sw_lat: data.getSouthWest().lat,
          sw_lng: data.getSouthWest().lng,
        },
      })),
    setDevice: (device: DeviceType) => set(() => ({ device })),
    setMarkerData: (markerData: MarkerData[]) => set(() => ({ markerData })),
  },
}));

export const useIsDrawerOpen = () => useMapStore((state) => state.isDrawerOpen);
export const useDrawerData = () => useMapStore((state) => state.drawerData);
export const useMapActions = () => useMapStore((state) => state.actions);
export const usePopUpData = () => useMapStore((state) => state.popUpData);
export const useCoordinates = () => useMapStore((state) => state.coordinates);
export const useDevice = () => useMapStore((state) => state.device);
export const useMarkerData = () => useMapStore((state) => state.markerData);

export const setMarkerData = useMapStore.getState().actions.setMarkerData;
