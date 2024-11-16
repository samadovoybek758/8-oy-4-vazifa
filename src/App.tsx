import React, { FC, useRef, useState } from "react";

const App: FC = () => {
  const countryRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<Type>();
  const key: string = "d433cc09398f9f3cc1dcd2533abfacb4";

  interface Type {
    base: string;
    clouds: clouds;
    cod: number;
    coord: coord;
    dt: number;
    id: number;
    main: main;
    name: string;
    sys: sys;
    timezone: number;
    visibility: number;
    weather: weather[];
    wind: wind;
  }

  interface clouds {
    all: number;
  }

  interface coord {
    lat: number;
    lon: number;
  }
  interface main {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  }
  interface sys {
    county: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  }

  interface weather {
    description: string;
    icon: string;
    id: number;
    main: string;
  }

  interface wind {
    deg: number;
    speed: number;
  }

  function handle_btn(e: React.FormEvent) {
    e.preventDefault();

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${countryRef.current?.value}&appid=${key}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    

      if (countryRef.current) {
        countryRef.current.value = ''
      }
  }

  
  return (
    <>
      <div className="w-[300px] bg-blue-200 p-6 mx-auto mt-40 rounded-md flex flex-col mb-20">

        <div className="flex flex-row justify-between">
          <input
            ref={countryRef}
            className="py-1 bg-transparent w-[192px] px-2 text-gray-400 rounded-md border border-solid border-blue-500"
            type="text"
            placeholder="Enter your city"
          />
          <button
            onClick={handle_btn}
            className="px-3 bg-blue-500 text-white border-none cursor-pointer rounded-md"
          >
            Send
          </button>
        </div>
        <div>
            {
              data && (
                <div className="flex flex-col items-center">
                     <h1 className="text-stone-500 font-bold text-2xl text-center mt-4">{data.name}</h1>
                     <h1 className="text-stone-500 font-semibold text-xl text-center mt-2">{data.weather[0].description}</h1>
                     <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}  alt="" />
                     <span className="text-stone-500 font-semibold text-3xl text-center mt-2">{data.main.temp}</span>
                     <span className="text-stone-500 font-semibold text-xl text-center mt-2">Wind speed: {data.wind.speed}</span>
                     <span className="text-stone-500 font-semibold text-xl text-center mt-2">Max: {data.main.temp_max}</span>
                     <span className="text-stone-500 font-semibold text-xl text-center mt-2">Min: {data.main.temp_min}</span>
                  </div>
              )
            }
          </div>

      </div>
    </>
  );
};

export default App;
