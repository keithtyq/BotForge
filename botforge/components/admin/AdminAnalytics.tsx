
import React, { useEffect, useRef } from 'react';

// Declare Chart to prevent TypeScript errors since it's loaded via CDN in index.html
declare const Chart: any;

export const AdminAnalytics: React.FC = () => {
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const lineChartInstance = useRef<any>(null);
  const pieChartInstance = useRef<any>(null);

  useEffect(() => {
    // --- Initialize Line Chart ---
    if (lineChartRef.current) {
      // Destroy existing chart instance if it exists to prevent canvas reuse errors
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      const ctxLine = lineChartRef.current.getContext('2d');
      if (ctxLine) {
        lineChartInstance.current = new Chart(ctxLine, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                label: 'Users',
                data: [400, 300, 550, 450, 600, 700, 650],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }

    // --- Initialize Pie Chart ---
    if (pieChartRef.current) {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      const ctxPie = pieChartRef.current.getContext('2d');
      if (ctxPie) {
        pieChartInstance.current = new Chart(ctxPie, {
          type: 'doughnut',
          data: {
            labels: ['Active', 'Inactive（Over 1 Month）', 'Revoked'],
            datasets: [
              {
                data: [60, 30, 10],
                backgroundColor: ['#3B82F6', '#9CA3AF', '#F87171'],
                borderWidth: 0
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      }
    }

    // Cleanup on unmount
    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl text-gray-800 font-normal mb-6">statistics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily System Usage Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm min-h-[350px]">
          <h3 className="text-center text-sm font-medium text-gray-600 mb-4">Daily System Usage</h3>
          <div className="h-64 w-full">
            <canvas ref={lineChartRef} id="lineChart"></canvas>
          </div>
        </div>

        {/* User Account Status Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm min-h-[350px] flex flex-col items-center">
          <h3 className="text-center text-sm font-medium text-gray-600 mb-4">User Account Status</h3>
          <div className="h-64 w-64 flex items-center justify-center">
            <canvas ref={pieChartRef} id="pieChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};
