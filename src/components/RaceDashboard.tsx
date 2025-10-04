import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Chart from 'chart.js/auto'

interface RiderData {
  id: string
  name: string
  level: string
  discipline: string
  location: string
  season_rank: number
  total_points: number
  win_rate: number
  championship_wins: number
  podium_finishes: string
  performance_trend: string
  elite_level: string
  avg_finish_position: number
  best_lap_time: string
  races_completed: string
}

interface RaceResult {
  rider_id: string
  date: string
  event: string
  category: string
  position: string
  time: string
  is_winner: boolean
  event_type: string
  season: string
}

const defaultRider: RiderData = {
  id: "mael-massoutie-bover",
  name: "MAEL MASSOUTIE BOVER",
  level: "Elite",
  discipline: "Enduro",
  location: "Girona, Spain",
  season_rank: 1,
  total_points: 485,
  win_rate: 78,
  championship_wins: 5,
  podium_finishes: "12+",
  performance_trend: "Continuously improving",
  elite_level: "Scratch",
  avg_finish_position: 1.8,
  best_lap_time: "2:41:09",
  races_completed: "25+"
}

const defaultRaceResults: RaceResult[] = [
  {
    rider_id: "mael-massoutie-bover",
    date: "2025-05-25",
    event: "Montefaro Enduro Race (season finale)",
    category: "Cadete",
    position: "1st",
    time: "-",
    is_winner: true,
    event_type: "Enduro",
    season: "2025"
  },
  {
    rider_id: "mael-massoutie-bover",
    date: "2025-04-13",
    event: "V Enduro Monte Castelo Burela",
    category: "Elite/Absolute",
    position: "1st",
    time: "13:20:64",
    is_winner: true,
    event_type: "Enduro",
    season: "2025"
  },
  {
    rider_id: "mael-massoutie-bover",
    date: "2024-09-08",
    event: "Copa de Catalunya Enduro",
    category: "Elite",
    position: "1st",
    time: "2:45:32",
    is_winner: true,
    event_type: "Enduro",
    season: "2024"
  },
  {
    rider_id: "mael-massoutie-bover",
    date: "2024-03-24",
    event: "Copa de España Enduro",
    category: "Elite",
    position: "1st",
    time: "3:12:18",
    is_winner: true,
    event_type: "Enduro",
    season: "2024"
  },
  {
    rider_id: "mael-massoutie-bover",
    date: "2024-03-15",
    event: "Campeonato Catalunya",
    category: "Elite",
    position: "3rd",
    time: "2:58:44",
    is_winner: false,
    event_type: "Enduro",
    season: "2024"
  },
  {
    rider_id: "mael-massoutie-bover",
    date: "2024-02-20",
    event: "Copa Catalunya Enduro",
    category: "Elite",
    position: "1st",
    time: "2:41:09",
    is_winner: true,
    event_type: "Enduro",
    season: "2024"
  }
]

export const RaceDashboard: React.FC = () => {
  const [riderData, setRiderData] = useState<RiderData>(defaultRider)
  const [raceResults, setRaceResults] = useState<RaceResult[]>(defaultRaceResults)
  const [showPerformanceModal, setShowPerformanceModal] = useState(false)
  const [showChampionshipModal, setShowChampionshipModal] = useState(false)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (showPerformanceModal && chartRef.current) {
      createPerformanceChart()
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
        chartInstance.current = null
      }
    }
  }, [showPerformanceModal])

  const loadData = async () => {
    try {
      const riderResponse = await fetch('/tables/riders')
      const riderData = await riderResponse.json()
      if (riderData.data && riderData.data.length > 0) {
        setRiderData(riderData.data[0])
      }
    } catch (error) {
      console.log('Using default rider data')
    }

    try {
      const resultsResponse = await fetch('/tables/race_results')
      const resultsData = await resultsResponse.json()
      if (resultsData.data) {
        setRaceResults(resultsData.data)
      }
    } catch (error) {
      console.log('Using default race results')
    }
  }

  const createPerformanceChart = () => {
    if (!chartRef.current) return
    
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Race 1', 'Race 2', 'Race 3', 'Race 4', 'Race 5', 'Race 6'],
        datasets: [
          {
            label: '% from Category Winner',
            data: [95, 97, 100, 98, 100, 100],
            borderColor: '#ffd700',
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: '% from Fastest Male',
            data: [88, 90, 92, 91, 94, 95],
            borderColor: '#48bb78',
            backgroundColor: 'rgba(72, 187, 120, 0.1)',
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
            labels: {
              color: '#e2e8f0',
              font: { size: 14 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(26, 32, 44, 0.95)',
            titleColor: '#e2e8f0',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { color: '#a0aec0' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          x: {
            ticks: { color: '#a0aec0' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        }
      }
    })
  }

  const getPositionClass = (position: string) => {
    if (position === '1st') return 'position-1st'
    if (position === '2nd') return 'position-2nd'
    if (position === '3rd') return 'position-3rd'
    return ''
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const wins = raceResults.filter(r => r.position === '1st')
  const podiums = raceResults.filter(r => r.position === '2nd' || r.position === '3rd')
  const championships = raceResults.filter(r => r.event.toLowerCase().includes('champion'))

  const PerformanceModal = () => (
    <div className="race-dashboard-container modal" onClick={() => setShowPerformanceModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Mael's Race Performance</h2>
          <p className="modal-subtitle">Tip: Click the chart legend to toggle each data series</p>
          <span className="close-modal" onClick={() => setShowPerformanceModal(false)}>&times;</span>
        </div>
        <div className="modal-body">
          <div className="chart-container">
            <canvas ref={chartRef} style={{ height: '400px' }}></canvas>
          </div>
        </div>
      </div>
    </div>
  )

  const ChampionshipModal = () => (
    <div className="race-dashboard-container modal" onClick={() => setShowChampionshipModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><i className="fas fa-trophy" style={{ color: '#ffd700', marginRight: '10px' }}></i>Championship Wins & Victories</h2>
          <p className="modal-subtitle">Complete verified race results showing wins and championship titles</p>
          <span className="close-modal" onClick={() => setShowChampionshipModal(false)}>&times;</span>
        </div>
        <div className="modal-body">
          <div className="championship-summary">
            <div className="summary-stats">
              <div className="summary-stat">
                <span className="stat-number">{wins.length}</span>
                <span className="stat-label">Race Wins</span>
              </div>
              <div className="summary-stat">
                <span className="stat-number">{championships.length}</span>
                <span className="stat-label">Championships</span>
              </div>
              <div className="summary-stat">
                <span className="stat-number">{wins.length + podiums.length}</span>
                <span className="stat-label">Total Podiums</span>
              </div>
            </div>
          </div>
          
          <div className="wins-section">
            <h3><i className="fas fa-medal" style={{ color: '#ffd700', marginRight: '8px' }}></i>Race Wins (1st Place)</h3>
            <div className="wins-table-container">
              <table className="wins-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Event</th>
                    <th>Category</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {wins.map((result, index) => (
                    <tr key={index}>
                      <td>{formatDate(result.date)}</td>
                      <td>{result.event}</td>
                      <td>{result.category}</td>
                      <td>{result.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {podiums.length > 0 && (
            <div className="podiums-section">
              <h3><i className="fas fa-award" style={{ color: '#c0c0c0', marginRight: '8px' }}></i>Podium Finishes (2nd & 3rd)</h3>
              <div className="podiums-table-container">
                <table className="podiums-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Event</th>
                      <th>Category</th>
                      <th>Position</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {podiums.map((result, index) => (
                      <tr key={index}>
                        <td>{formatDate(result.date)}</td>
                        <td>{result.event}</td>
                        <td>{result.category}</td>
                        <td><span className={getPositionClass(result.position)}>{result.position}</span></td>
                        <td>{result.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
    <div className="race-dashboard-container">
      {/* Rider Header */}
      <div className="rider-header">
        <h1 className="rider-name">{riderData.name}</h1>
        <p className="rider-info">{riderData.level} • {riderData.discipline} • {riderData.location}</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-label">SEASON RANK</div>
          <div className="stat-value main-rank">#{riderData.season_rank}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">POINTS</div>
          <div className="stat-value main-points">{riderData.total_points}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">WIN RATE</div>
          <div className="stat-value main-winrate">{riderData.win_rate}%</div>
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="achievements-grid">
        <div 
          className="achievement-card clickable" 
          onClick={() => setShowChampionshipModal(true)}
          title="Click to view championship wins and race victories"
        >
          <div className="achievement-icon">
            <i className="fas fa-trophy"></i>
          </div>
          <div className="achievement-content">
            <h3>Championship Wins <i className="fas fa-external-link-alt" style={{ fontSize: '0.7rem', marginLeft: '5px', opacity: 0.7 }}></i></h3>
            <div className="achievement-number">{riderData.championship_wins}</div>
            <div className="achievement-description">Copa de España & Catalunya</div>
          </div>
        </div>

        <div className="achievement-card">
          <div className="achievement-icon">
            <i className="fas fa-medal"></i>
          </div>
          <div className="achievement-content">
            <h3>Podium Finishes</h3>
            <div className="achievement-number">{riderData.podium_finishes}</div>
            <div className="achievement-description">Consistent top-3 results</div>
          </div>
        </div>

        <div 
          className="achievement-card clickable" 
          onClick={() => setShowPerformanceModal(true)}
          title="Click to view performance chart"
        >
          <div className="achievement-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="achievement-content">
            <h3>Performance Trend <i className="fas fa-external-link-alt" style={{ fontSize: '0.7rem', marginLeft: '5px', opacity: 0.7 }}></i></h3>
            <div className="achievement-trend">
              <i className="fas fa-arrow-up"></i>
            </div>
            <div className="achievement-description">{riderData.performance_trend}</div>
          </div>
        </div>

        <div className="achievement-card">
          <div className="achievement-icon">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="achievement-content">
            <h3>Elite Level</h3>
            <div className="achievement-status">{riderData.elite_level}</div>
            <div className="achievement-description">Competing with pros</div>
          </div>
        </div>
      </div>

      {/* Recent Race Results */}
      <div className="race-results-section">
        <h2>Recent Race Results</h2>
        <div className="table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Category</th>
                <th>Position</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {raceResults.map((result, index) => (
                <tr key={index}>
                  <td>{formatDate(result.date)}</td>
                  <td>{result.event}</td>
                  <td>{result.category}</td>
                  <td>
                    <span className={getPositionClass(result.position)}>
                      {result.position}
                    </span>
                  </td>
                  <td>{result.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="additional-stats">
        <div className="stat-item">
          <div className="stat-label">AVG. FINISH POSITION</div>
          <div className="stat-value">{riderData.avg_finish_position}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">BEST LAP TIME</div>
          <div className="stat-value">{riderData.best_lap_time}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">RACES COMPLETED</div>
          <div className="stat-value">{riderData.races_completed}</div>
        </div>
      </div>

      <div className="championship-points">
        <div className="stat-label">CHAMPIONSHIP POINTS</div>
        <div className="stat-value championship-total">{riderData.total_points}</div>
      </div>
    </div>

    {/* Modals rendered via portals */}
    {showPerformanceModal && createPortal(<PerformanceModal />, document.body)}
    {showChampionshipModal && createPortal(<ChampionshipModal />, document.body)}
    </>
  )
}
