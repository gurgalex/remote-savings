import React, { useState, useEffect} from 'react';
import { Form, Input, InputNumber } from 'antd';
import CommuteInfo from './calculation';
import './App.css';

const DEFAULT_MINUTES = 10;
const DEFAULT_MILES = 5;
const DEFUALT_REMOTE_DAYS = 3;

const App = () => {
    const [minutes, setMinutes] = useState(DEFAULT_MINUTES);
    const [distance, setDistance] = useState(DEFAULT_MILES);
    const [daysRemote, setDaysRemote] = useState(DEFUALT_REMOTE_DAYS);

    useEffect(() => {
        console.log('got values:', [minutes, distance, daysRemote]);
        const body = document.body!;
        const commute_distance = distance;
        console.log(`values: distance: ${distance}, miles: ${distance}, daysRemote: ${daysRemote}`);
        const commute_time = minutes;
        const days_remote = daysRemote;

        const commute = new CommuteInfo(commute_distance, commute_time, CommuteInfo.WORK_DAYS - days_remote);
        const PTO_WEEKS = 3;
        const yearlySavings = commute.remoteSavingsWeekly().mul(52 - PTO_WEEKS).toFixed(0);
        const yearlyHoursSaved = (commute.roundtripTime() / 60 * daysRemote * (52 - PTO_WEEKS)).toFixed(0);
        const commute_text = `Working remote ${days_remote} days will save $${yearlySavings} and ${yearlyHoursSaved} hour(s) per year.
`;
        let savingsID = document.getElementById("savings");
        if (savingsID === null) {
            const d = document.createElement("div")
            body.appendChild(d);
            d.id = "savings";
            const content_savings = document.createTextNode(commute_text);
            d.appendChild(content_savings);
        }
        else {
            savingsID.innerText = commute_text;
        }

    },
        [minutes, distance, daysRemote]);

    const explanation = <p>Based on roundtrip travel and an IRS estimated cost of $0.585 per mile.</p >;

    return (
    <>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <Form.Item
                initialValue={DEFAULT_MILES}
                label="Commute distance (mi)"
                name="commute_distance"
                rules={[{ required: true, message: 'Please input your commute distance' }]}
            >
                <InputNumber min={1} onChange={num => setDistance(num)} />
            </Form.Item>

            <Form.Item
                initialValue={DEFAULT_MINUTES}
                label="commute time (minutes)"
                name="commute_time"
                rules={[{ required: true, message: 'Please input how long your commute takes' }]}
            >
                <InputNumber min={1} onChange={num => setMinutes(num)} />
            </Form.Item>

            <Form.Item
                initialValue={DEFUALT_REMOTE_DAYS}
                label="days of week remote"
                name="days_remote"
                rules={[{ required: true, message: 'Please input how many days you work from home per week' }]}
                >
                    <InputNumber min={0} max={5} onChange={num => setDaysRemote(num)} />
            </Form.Item>

            </Form>
            {explanation}
            </>
    );
};
export default App;




















/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/