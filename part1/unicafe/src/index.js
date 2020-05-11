import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({ handleSet, text }) => <button onClick={handleSet}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good * 100) / all + '%';

  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>Ne feedback give</p>
      </>
    );
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text={'good'} value={good} />
          <Statistic text={'neutral'} value={neutral} />
          <Statistic text={'bad'} value={bad} />
          <Statistic text={'all'} value={all} />
          <Statistic text={'average'} value={average} />
          <Statistic text={'positive'} value={positive} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleSetGood = () => setGood(good + 1);
  const handleSetNeutral = () => setNeutral(neutral + 1);
  const handleSetBad = () => setBad(bad + 1);

  return (
    <>
      <h1>give feedback</h1>
      <Button handleSet={handleSetGood} text={'good'} />
      <Button handleSet={handleSetNeutral} text={'neutral'} />
      <Button handleSet={handleSetBad} text={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
