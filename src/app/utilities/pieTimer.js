// PieTimer.js
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';

Chart.register(ArcElement, Tooltip);

const PieTimer = ({ duration }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [data, setData] = useState({
    labels: ['Time Remaining', 'Elapsed'],
    datasets: [
      {
        label: 'Timer',
        data: [duration, 0],
        backgroundColor: ['#FF0000', '#E5E5E5'],
        borderWidth: 0,
      },
    ],
  });

  useEffect(() => {
    // Mettre à jour le timer chaque seconde
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  useEffect(() => {
    // Mettre à jour les données du graphique pour refléter le temps restant
    setData({
      ...data,
      datasets: [
        {
          ...data.datasets[0],
          data: [timeRemaining, duration - timeRemaining],
        },
      ],
    });
  }, [timeRemaining, duration]);

  return (
    <div style={{ width: '100px', height: '100px' }}>
      <Doughnut
        data={data}
        options={{
          cutout: '80%', // Crée un "trou" pour un effet de donut
          plugins: {
            tooltip: { enabled: false }, // Désactive les tooltips
          },
        }}
      />
      <div className="timer-text">
        {timeRemaining}s
      </div>
    </div>
  );
};

export default PieTimer;
