//TEST: "http://samples.openweathermap.org/data/2.5/forecast?id=524901&appid="

import {WEATHER_KEY} from "../config/config";
import axios from "axios";
import {logger} from "../utils/logger";

export const WeatherService = (() => {

    const ret: any = {};
    
    // returns .temp and .humidity for the given place (string)
    const getWeatherData = (place: string) => {
        return axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: place + ",de",
                appid: WEATHER_KEY,
                units: "metric",
            }
        }).then((result) => {
            ret.temp = result.data.main.temp;
            ret.humidity = result.data.main.humidity;
            return ret;
        }).catch((err: Error) => {
            logger.error("There was an error when getting weather data", {error: err});
            return;
        });
    };

    // result.temp = jason.main.temp;
    // result.humidity = jason.main.humidity;

return {getWeatherData};

})();