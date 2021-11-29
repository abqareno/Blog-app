import axios from "axios";
import {
  GET_GEODATA_FAIL,
  GET_GEODATA_REQUEST,
  GET_GEODATA_SUCCESS,
  GET_GEODATA_RESET,
} from "./geoDataTypes";

export const getGeoData = () => {
  return async (dispatch) => {
    dispatch({ type: GET_GEODATA_REQUEST });
    try {
      const res = await axios.get("https://geolocation-db.com/json/");
      dispatch({ type: GET_GEODATA_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_GEODATA_FAIL, payload: error });
    }
  };
};

export const resetGeoData = () => {
  return (dispatch) => {
    dispatch({ type: GET_GEODATA_RESET });
  };
};
