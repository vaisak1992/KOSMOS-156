import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaWind } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { TbTemperatureSun } from "react-icons/tb";
import { TbMapSearch } from "react-icons/tb";
import { TbListDetails } from "react-icons/tb";
import { GetAllAData, Wetin } from './Api/Apix';
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';



function Pilot() {
    const [ws, setws] = useState(0);
    const [Data, setData] = useState({})
    const [tem9, settem9] = useState(0)
    const [tem9F, settem9F] = useState(0)
    const [searchInput, setSearchInput] = useState("");
    const [SedaVi, setSedaVi] = useState(true)
    const KAdata = useSelector(state => state.K156.Data)
    const [RDate, setRDate] = useState('')


    const dispatch = useDispatch()
    useEffect(() => {
        GetAllAData(dispatch)

    }, [Data,])


    const searchL = (e) => {
        e.preventDefault();
        console.log('on searchl');

        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&appid=dac5da142ad8b0a33ebf74bd639fa99e`;

        axios.get(url)
            .then((res) => {
                console.log('got lat and lon');

                const Wurl = `https://api.openweathermap.org/data/2.5/weather?lat=${res.data[0].lat}&lon=${res.data[0].lon}&units=metric&appid=dac5da142ad8b0a33ebf74bd639fa99e`;
                console.log('going to search');
                axios.get(Wurl)
                    .then((res) => {
                        console.log('got search');

                        console.log("weather Data:", res.data);
                        const tempp = res.data.main.temp
                        const tem = tempp.toFixed(1)
                        settem9(tem)
                        const tempf = res.data.main.feels_like
                        const temf = tempf.toFixed(1)
                        settem9F(temf)
                        const wis = res.data.wind.speed * 1.60
                        const wss = wis.toFixed(1)
                        setws(wss)
                        Wetin({ clo: res.data.clouds.all, hum: res.data.main.humidity, place: res.data.name, wcon: res.data.weather[0].main, ws: res.data.wind.speed, desc: res.data.weather[0].description, temp: res.data.main.temp })
                        setData(res.data);
                    })
                    .catch((err) => {
                        console.error("Error fetching data:", err);
                    });
                console.log("Location Data:", res.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    };

    const toggleSeda = () => {
        setSedaVi(!SedaVi);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true
        });
    };
    const temfix = (t) => {
        var t = Number(t)
        var tt = t.toFixed(1)

        return tt
    }


    return (
        <div style={{ display: "flex" }}>
            <div className="mainp">

                <div >
                    <div style={{margin:'20px'}}>
                        <img style={{ width: "200px", height: "auto",}} src="/20250127_002507.png" alt="" />
                    </div>
                    <div className='for' style={{ display: 'flex', justifyContent: 'center' }}>
                        <Form onSubmit={searchL}>
                            <Row >
                                <Col xs="auto">
                                    <Form.Control

                                        style={{ borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.63)', background: 'rgba(255, 255, 255, 0.52)', textAlign: 'center', color: 'black' }}
                                        type="text"
                                        placeholder="Enter location"
                                        className="inp"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-dark" style={{ borderRadius: "30px" }} type="submit" ><TbMapSearch /></Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div style={{ marginTop: '35px' }}>
                        {Data.main && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                                <div>
                                    <h1 style={{ fontSize: '1.6rem' }}> <FaMapLocationDot />  {Data.name}</h1>

                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                    <div style={{ marginRight: '30px' }}>
                                        <h1 style={{ fontSize: '6rem' }}>{tem9}°C</h1>
                                    </div>
                                    <div style={{ transform: 'rotate(269deg)' }}>
                                        <h1>{Data.weather[0].main}</h1>

                                    </div>
                                </div>



                            </div>

                        )}
                    </div>
                </div>


                <div>
                    {
                        Data.main && (
                            <div className='btab' >

                                <div>
                                    <h1>{tem9F}°C</h1>
                                    <h2><TbTemperatureSun /></h2>
                                </div>
                                <div>
                                    <h1>{Data.main.humidity}%</h1>
                                    <h2><WiHumidity /></h2>
                                </div>

                                <div>
                                    <h1>{ws} kmph</h1>
                                    <h3><FaWind /></h3>
                                </div>
                            </div>

                        )
                    }
                    <div style={{ marginTop: '20px' }}>
                        <Button variant="outline-danger" style={{ borderRadius: "30px" }} onClick={toggleSeda} ><TbListDetails /></Button>
                    </div>
                </div>


            </div>
            <div className={'Seda'} hidden={SedaVi}>

                <div className='Clsb' style={{ position: 'absolute', right: 0 }}>
                    <Button variant="danger" style={{ borderRadius: "30px" }} onClick={toggleSeda} ><CgClose /></Button>

                </div>
                <div style={{ marginTop: '46px' }} className="scrollable-div">
                    {
                        [...KAdata].reverse().map((ka) => (
                            <div key={ka._id} style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '30px', marginTop: '10px', padding: '10px' }}>


                                <div>
                                    <h1 style={{ fontSize: '1rem' }}> <FaMapLocationDot />  {ka.place}</h1>

                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                    <div style={{ marginRight: '20px' }}>

                                        <h1 style={{ fontSize: '4rem' }}>{temfix(ka.temp)}°C</h1>
                                    </div>
                                    <div style={{ transform: 'rotate(269deg)', color: 'rgba(256,256,256,0.7)', marginLeft: 'auto' }}>
                                        <h1 style={{ fontSize: '30px', }}>{ka.wcondition}</h1>

                                    </div>
                                </div>
                                <div>
                                    {ka.description}
                                </div>
                                <div>
                                    <FaWind /> {ka.windspeed}
                                </div>
                                <div>
                                    <WiHumidity /> {ka.humidity}
                                </div>


                                <div style={{ fontSize: '15px', marginTop: '10px' }}>
                                    <p>{formatDate(ka.createdAt)}</p>
                                </div>

                            </div>
                        ))
                    }
                </div>


            </div>

        </div>
    );
}

export default Pilot;
