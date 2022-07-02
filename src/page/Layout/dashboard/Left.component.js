import moment from "moment";
import React, {useEffect, useState} from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {BiRadioCircle} from "react-icons/bi";
import {FaSearchLocation} from "react-icons/fa";

import {LoadingWeather} from "../../../components";

import useDebounce from "../../../hooks/useDebounce";
const initWeather = {
    base: "",
    clouds: {all: 0},
    cod: 0,
    coord: {lon: 106.6667, lat: 10.75},
    dt: 0,
    id: 0,
    main: {
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    },
    name: "Ho Chi Minh City",
    sys: {
        type: 1,
        id: 9314,
        country: "VN",
        sunrise: 1654554620,
        sunset: 1654600450,
    },
    timezone: 25200,
    visibility: 10000,
    weather: [
        {
            description: "",
            icon: "",
            id: 0,
            main: "",
        },
    ],
    wind: {speed: 0, deg: 0},
};

const Left = ({dark, autoFetch}) => {
    const [wLoading, setWLoading] = useState(false);
    const [cityName, setCityName] = useState("Ho Chi Minh");
    const [weather, setWeather] = useState(initWeather);
    const [wError, setWError] = useState(false);
    const [cityHistory, setCityHistory] = useState([]);
    const weatherDebounce = useDebounce(cityName, 500);
    useEffect(() => {
        if (weatherDebounce) {
            getWeather();
        }
    }, [weatherDebounce]);

    const getWeather = async () => {
        setWLoading(true);
        try {
            const {data} = await autoFetch.get(`/api/weather/${cityName}`);
            setWError(false);
            setWeather(data.data);
            // @ts-ignore
            if (!cityHistory.includes(data.data.name)) {
                if (cityHistory.length === 5) {
                    setCityHistory(
                        // @ts-ignore
                        [...cityHistory, data.data.name].splice(1, 4)
                    );
                } else {
                    // @ts-ignore
                    setCityHistory([...cityHistory, data.data.name]);
                }
            }
        } catch (error) {
            setWError(true);
        }
        setWLoading(false);
    };

    const left = () => {
        if (wError)
            return <div className=' text-2xl my-5 '>No city found!</div>;
        if (wLoading)
            return (
                <div className='my-8'>
                    <LoadingWeather />
                </div>
            );
        if (weather.cod === 200) {
            return (
                <>
                    <div className='text-2xl font-semibold mt-3 pt-4 mb-0 border-t-[1px] dark:border-white/30 border-black/30 w-full text-center '>
                        {weather.name} ({weather.sys.country})
                    </div>
                    <div className='my-1 '>{weather.weather[0].main}</div>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt='icon-weather'
                        className='w-20 h-20 bg-sky-500 dark:bg-sky-700 rounded-full my-2 '
                    />
                    <div className='mb-6 text-[60px] font-bold w-full  flex justify-center leading-[48px] '>
                        {weather.main.temp}
                        <BiRadioCircle className='text-2xl ' />C
                    </div>
                    <div className='weather-information'>
                        <h1>Feel like</h1>
                        <p className='flex '>
                            {weather.main.feels_like}
                            <BiRadioCircle className='text-[10px] mt-1 ' />C
                        </p>
                    </div>
                    <div className='grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-4 w-full mt-5 pt-5 border-t-[1px] dark:border-white/30 border-black/30 '>
                        <div className='weather-information'>
                            <h1>Sunrise</h1>
                            <p>
                                {moment
                                    .unix(weather.sys.sunrise)
                                    .format("H:mm")}
                            </p>
                        </div>
                        <div className='weather-information'>
                            <h1>Sunset</h1>
                            <p>
                                {moment.unix(weather.sys.sunset).format("H:mm")}
                            </p>
                        </div>
                        <div className='weather-information'>
                            <h1>Humidity</h1>
                            <p>{weather.main.humidity} %</p>
                        </div>
                        <div className='weather-information'>
                            <h1>Wind</h1>
                            <p>{weather.wind.speed} km/h</p>
                        </div>
                    </div>
                </>
            );
        }
    };
    return (
        <div
            className={`bg-white  ${
                !dark ? "shadow-post" : ""
            } dark:bg-[#242526] flex flex-col items-center rounded-lg py-4 px-5 md:fixed w-full mb-5 md:w-[24%] `}>
            <div className='flex items-center gap-x-1 dark:dark:bg-[#393A3B] bg-[#F1F2F4] rounded-full px-3 text-[15px] px-y group '>
                <FaSearchLocation className='text-2xl dark:text-white/50 text-black/30 dark:group-focus-within:text-white group-focus-within:text-black/50 ' />

                <input
                    type='text'
                    className=' border-0 bg-inherit  fucus:ring-0 focus-within:ring-0 dark:placeholder:text-white/50 rounded-full w-[170px] '
                    placeholder='Search city...'
                    value={cityName}
                    onChange={(e) => {
                        setCityName(e.target.value);
                    }}
                />
                {cityName && (
                    <AiOutlineCloseCircle
                        className={`cursor-pointer opacity-0 group-hover:opacity-100 transition-50 `}
                        onClick={() => {
                            setCityName("");
                        }}
                    />
                )}
            </div>
            {cityHistory.length > 0 && (
                <div className='flex mt-3 gap-x-2 items-center flex-wrap '>
                    <div className='mt-1 '>History :</div>{" "}
                    {cityHistory.map((v) => (
                        <span
                            key={v}
                            className='px-3 py-0.5 dark:bg-[#393A3B] rounded-full cursor-pointer mt-1  '
                            onClick={() => {
                                setCityName(v);
                            }}>
                            {v}
                        </span>
                    ))}
                </div>
            )}

            {left()}
        </div>
    );
};

export default Left;
