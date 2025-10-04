// Cycling Race Dashboard JavaScript
class CyclingDashboard {
    constructor() {
        this.riderData = null;
        this.raceResults = [];
        this.init();
    }

    async init() {
        await this.loadRiderData();
        await this.loadRaceResults();
        this.setupEventListeners();
        this.displayRider();
    }

    async loadRiderData() {
        try {
            const response = await fetch('/tables/riders');
            const data = await response.json();
            // Get the first rider (Mael) or find by ID
            this.riderData = data.data && data.data.length > 0 ? data.data[0] : null;
        } catch (error) {
            console.log('No rider data yet, using default data');
            this.riderData = this.getDefaultRider();
        }
    }

    async loadRaceResults() {
        try {
            const response = await fetch('/tables/race_results');
            const data = await response.json();
            this.raceResults = data.data || [];
        } catch (error) {
            console.log('No race results data yet, using default data');
            // Initialize with default data directly
            this.raceResults = [
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
            ];
        }

    }



    setupEventListeners() {
        const refreshBtn = document.getElementById('refreshData');
        const performanceTrendCard = document.querySelector('.achievement-card:nth-child(3)');
        const championshipWinsCard = document.querySelector('.achievement-card:nth-child(1)');
        const performanceModal = document.getElementById('performanceModal');
        const championshipModal = document.getElementById('championshipModal');

        refreshBtn.addEventListener('click', () => {
            this.refreshData();
        });

        // Performance trend card click handler
        if (performanceTrendCard) {
            performanceTrendCard.style.cursor = 'pointer';
            performanceTrendCard.addEventListener('click', () => {
                this.openPerformanceModal();
            });
        }

        // Championship wins card click handler
        if (championshipWinsCard) {
            championshipWinsCard.style.cursor = 'pointer';
            championshipWinsCard.addEventListener('click', () => {
                this.openChampionshipModal();
            });
        }

        // Modal close handlers
        document.querySelectorAll('.close-modal').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modalId = e.target.getAttribute('data-modal');
                if (modalId === 'championshipModal') {
                    this.closeChampionshipModal();
                } else {
                    this.closePerformanceModal();
                }
            });
        });

        // Close modals when clicking outside
        [performanceModal, championshipModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        if (modal.id === 'championshipModal') {
                            this.closeChampionshipModal();
                        } else {
                            this.closePerformanceModal();
                        }
                    }
                });
            }
        });

        // Close modals with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePerformanceModal();
                this.closeChampionshipModal();
            }
        });
    }

    displayRider() {
        if (!this.riderData) return;
        
        const rider = this.riderData;

        // Update rider header
        document.getElementById('riderName').textContent = rider.name;
        document.getElementById('riderInfo').textContent = `${rider.level} • ${rider.discipline} • ${rider.location}`;

        // Update main stats
        document.getElementById('seasonRank').textContent = `#${rider.season_rank}`;
        document.getElementById('totalPoints').textContent = rider.total_points;
        document.getElementById('winRate').textContent = `${rider.win_rate}%`;

        // Update achievement cards
        document.getElementById('championshipWins').textContent = rider.championship_wins;
        document.getElementById('championshipDesc').textContent = 'Copa de España & Catalunya';
        document.getElementById('podiumFinishes').textContent = rider.podium_finishes;
        document.getElementById('podiumDesc').textContent = 'Consistent top-3 results';
        document.getElementById('trendDesc').textContent = rider.performance_trend;
        document.getElementById('eliteStatus').textContent = rider.elite_level;
        document.getElementById('eliteDesc').textContent = 'Competing with pros';

        // Update additional stats
        document.getElementById('avgPosition').textContent = rider.avg_finish_position;
        document.getElementById('bestLapTime').textContent = rider.best_lap_time;
        document.getElementById('racesCompleted').textContent = rider.races_completed;
        document.getElementById('championshipPoints').textContent = rider.total_points;

        // Update race results table
        this.displayRaceResults(rider.id);
    }

    displayRaceResults(riderId) {
        if (!this.raceResults || !Array.isArray(this.raceResults)) {
            this.raceResults = [];
        }
        const riderResults = this.raceResults.filter(result => result.rider_id === riderId);
        const tableBody = document.getElementById('resultsTableBody');
        
        // Sort by date (most recent first)
        riderResults.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        tableBody.innerHTML = '';

        riderResults.forEach(result => {
            const row = document.createElement('tr');
            
            const positionClass = this.getPositionClass(result.position);
            
            row.innerHTML = `
                <td>${this.formatDate(result.date)}</td>
                <td>${result.event}</td>
                <td>${result.category}</td>
                <td><span class="${positionClass}">${result.position}</span></td>
                <td>${result.time || '-'}</td>
            `;
            
            tableBody.appendChild(row);
        });

        if (riderResults.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="5" style="text-align: center; padding: 30px; color: #a0aec0;">No race results available</td>';
            tableBody.appendChild(row);
        }
    }

    getPositionClass(position) {
        if (position === '1st') return 'position-1st';
        if (position === '2nd') return 'position-2nd';
        if (position === '3rd') return 'position-3rd';
        return '';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    async refreshData() {
        const refreshBtn = document.getElementById('refreshData');
        const icon = refreshBtn.querySelector('i');
        
        // Add spinning animation
        icon.classList.add('fa-spin');
        refreshBtn.disabled = true;

        try {
            await this.loadRiderData();
            await this.loadRaceResults();
            
            this.displayRider();
            
            console.log('Data refreshed successfully');
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            // Remove spinning animation
            icon.classList.remove('fa-spin');
            refreshBtn.disabled = false;
        }
    }

    // Method to add new rider (for testing purposes)
    async addRider(riderData) {
        try {
            const response = await fetch('/tables/riders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(riderData)
            });
            
            if (response.ok) {
                await this.loadRiders();
                console.log('Rider added successfully');
            }
        } catch (error) {
            console.error('Error adding rider:', error);
        }
    }

    // Method to add new race result (for testing purposes)
    async addRaceResult(resultData) {
        try {
            const response = await fetch('/tables/race_results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resultData)
            });
            
            if (response.ok) {
                await this.loadRaceResults();
                if (this.currentRiderId) {
                    this.displayRaceResults(this.currentRiderId);
                }
                console.log('Race result added successfully');
            }
        } catch (error) {
            console.error('Error adding race result:', error);
        }
    }

    // Default data for demo purposes
    getDefaultRider() {
        return {
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
        };
    }

    getDefaultRaceResults() {
        return [
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
                date: "2025-03-23",
                event: "EnduBítem (7è EnduBítem)",
                category: "Cadete",
                position: "1st",
                time: "-",
                is_winner: true,
                event_type: "Enduro",
                season: "2025"
            },
            {
                rider_id: "mael-massoutie-bover",
                date: "2025-03-16",
                event: "Reino de los Mallos Enduro MTB Race",
                category: "Absolute/Elite",
                position: "2nd",
                time: "14:10",
                is_winner: false,
                event_type: "Enduro",
                season: "2025"
            },
            {
                rider_id: "mael-massoutie-bover",
                date: "2025-03-09",
                event: "XXXI Gran Premio Maxxis - Sant Andreu de la Barca (Final)",
                category: "Cadete",
                position: "5th",
                time: "58:86",
                is_winner: false,
                event_type: "Enduro",
                season: "2025"
            },
            {
                rider_id: "mael-massoutie-bover",
                date: "2024-11-10",
                event: "Copa Catalana Enduro Season closing (Gavarres Gravity)",
                category: "Cadete",
                position: "1st",
                time: "-",
                is_winner: true,
                event_type: "Enduro",
                season: "2024"
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
                date: "2024-08-04",
                event: "Mordoride DH",
                category: "U17 Homme",
                position: "6th",
                time: "3:33:267",
                is_winner: false,
                event_type: "DH",
                season: "2024"
            },
            {
                rider_id: "mael-massoutie-bover",
                date: "2024-05-05",
                event: "Super Enduro Arfa (Copa de España / Copa Catalana)",
                category: "Cadete",
                position: "15th",
                time: "18:08:54",
                is_winner: false,
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
        ];
    }

    // Performance chart functionality
    openPerformanceModal() {
        const modal = document.getElementById('performanceModal');
        modal.style.display = 'block';
        
        // Create chart after modal is visible
        setTimeout(() => {
            this.createPerformanceChart();
        }, 100);
    }

    closePerformanceModal() {
        const modal = document.getElementById('performanceModal');
        modal.style.display = 'none';
        
        // Destroy existing chart
        if (this.performanceChart) {
            this.performanceChart.destroy();
            this.performanceChart = null;
        }
    }

    createPerformanceChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.performanceChart) {
            this.performanceChart.destroy();
        }

        const chartData = {
            labels: [
                'Copa Catalunya Enduro',
                'V En Estinnes Malux',
                'XXXI GranPrix Maxxis',
                'Campeonato Catalunya', 
                'Copa España Enduro',
                'Super Enduro Arfa',
                'Montefaro Enduro',
                'Reino de los Mallos',
                'EnduBítem 7è',
                'Monte Castelo Burela',
                'Gavarres Gravity',
                'Mordoride DH',
                'Copa España DH'
            ],
            datasets: [{
                label: '% from category winner',
                data: [0, 18, 12, 8, 0, 14, 0, 1.2, 0, 0, 0, 16, 8],
                borderColor: '#48bb78',
                backgroundColor: 'rgba(72, 187, 120, 0.1)',
                borderWidth: 3,
                fill: false,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#48bb78',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }, {
                label: '% from fastest male',
                data: [0, 21, 15, 12, 0, 18, 0, 3.5, 0, 0, 0, 20, 12],
                borderColor: '#d69e2e',
                backgroundColor: 'rgba(214, 158, 46, 0.1)',
                borderWidth: 3,
                fill: false,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#d69e2e',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        };

        const config = {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end',
                        labels: {
                            color: '#e2e8f0',
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '500'
                            },
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(26, 32, 44, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#e2e8f0',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#a0aec0',
                            font: {
                                family: 'Inter',
                                size: 11
                            },
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 25,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#a0aec0',
                            font: {
                                family: 'Inter',
                                size: 11
                            },
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        title: {
                            display: true,
                            text: '% from winning pace',
                            color: '#e2e8f0',
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '500'
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        };

        this.performanceChart = new Chart(ctx, config);
    }

    // Championship Wins Modal functionality
    openChampionshipModal() {
        const modal = document.getElementById('championshipModal');
        modal.style.display = 'block';
        
        // Load championship data after modal is visible
        setTimeout(() => {
            this.loadChampionshipData();
        }, 100);
    }

    closeChampionshipModal() {
        const modal = document.getElementById('championshipModal');
        modal.style.display = 'none';
    }

    async loadChampionshipData() {
        try {
            // Parse the CSV data (we'll use the data from the uploaded file)
            const csvData = await this.parseCSVData();
            
            // Filter and categorize the results
            const wins = csvData.filter(race => 
                race.Position.includes('1st') || 
                race.Position.includes('Season Champion') ||
                race.Position.includes('1st (Overall)')
            );
            
            const podiums = csvData.filter(race => 
                race.Position.includes('2nd') || 
                race.Position.includes('3rd')
            );
            
            const championships = csvData.filter(race =>
                race.Position.includes('Champion') ||
                race.Position.includes('1st (Overall)') ||
                race.Event.includes('Final classification')
            );
            
            // Update summary stats
            document.getElementById('totalWins').textContent = wins.length;
            document.getElementById('totalChampionships').textContent = championships.length;
            document.getElementById('totalPodiums').textContent = podiums.length;
            
            // Populate tables
            this.populateWinsTable(wins);
            this.populateChampionshipsList(championships);
            this.populatePodiumsTable(podiums);
            
        } catch (error) {
            console.error('Error loading championship data:', error);
            // Use default data if CSV parsing fails
            this.loadDefaultChampionshipData();
        }
    }

    async parseCSVData() {
        // This is the CSV data from the uploaded file
        const csvText = `Date,Event,Category,Position,Best_Lap_or_Time,Source
2024-09-08,Copa de Catalunya Enduro,Elite,1st,02:45:32,ciclisme.cat / event result
2024-03-24,Copa de España Enduro,Elite,1st,03:12:18,RFEC / ciclisme.cat
2024-03-15,Campeonato Catalunya,Elite,3rd,02:58:44,ciclisme.cat
2024-02-20,Copa Catalunya Enduro,Elite,1st,02:41:09,ciclisme.cat
2025-03-09,XXXI Gran Premio Maxxis - Sant Andreu de la Barca (Final),Cadete,5th (Final),00:58.86,ciclisme.cat / PDF (Final)
2025-03-09,XXXI Gran Premio Maxxis - Sant Andreu de la Barca (Qualifier),Cadete,46th (Qualifier),01:00.96,ciclisme.cat / PDF (Qualificatoria)
2025-03-23,EnduBítem (7è EnduBítem),Cadete,1st,,endubitem.bike / RFEC article (winner confirmed)
2024-11-10,Copa Catalana Enduro Season closing (Gavarres Gravity),Cadete,Season Champion,,ciclisme.cat (closing booklet)
2024-08-04,Mordoride DH,U17 Homme,6th,03:33.267,ciclisme.cat (PDF)
2024-05-05,Super Enduro Arfa (Copa de España / Copa Catalana),Cadete,15th,18:08.54,ciclisme.cat (PDF)
2025-05-25,Montefaro Enduro Race (season finale),Cadete,1st,,my.raceresult / RFEC classification (Montefaro)
2025-03-16,Reino de los Mallos Enduro MTB Race,Absolute/Elite,2nd,00:14:10,RFEC / sportmaniacs
2025-04-13,V Enduro Monte Castelo Burela,Elite/Absolute,1st,13:20.64,RFEC / my.raceresult
2024-02-25,Copa de España DH - Otívar,Cadete,9th,03:11.53,RFEC PDF (Otívar)
2024-03-10,XXX Gran Premio Maxxis - Sant Andreu de la Barca (2024 edition),Cadete,8th,02:14.54,RFEC / ciclisme.cat (Sant Andreu 10/03/2024)
2025-??-??,Copa de España BTT Enduro – Final classification (season 2025),Cadete,1st (Overall),975 pts (season total),RFEC final classification (2025 season)
2025-??-??,Copa de España BTT Descenso – Final classification (season 2025),Cadete,21st (Overall),148 pts (season total),RFEC final classification (2025 season)
2024-??-??,Ranking BTT DHI RFEC (2024 season),Cadete,20th (Overall),87 pts (season total),RFEC rankings (2024)
2024-??-??,Ranking BTT Enduro RFEC (2024 season),Cadete,43rd (Overall),,RFEC rankings (2024)`;

        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        
        return lines.slice(1).map(line => {
            const values = this.parseCSVLine(line);
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            return obj;
        });
    }

    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());
        return values;
    }

    populateWinsTable(wins) {
        const tableBody = document.getElementById('winsTableBody');
        tableBody.innerHTML = '';
        
        wins.forEach(race => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.formatDateForTable(race.Date)}</td>
                <td>${race.Event}</td>
                <td>${race.Category}</td>
                <td>${race.Best_Lap_or_Time || '-'}</td>
                <td><span class="source-link">${race.Source}</span></td>
            `;
            tableBody.appendChild(row);
        });
    }

    populateChampionshipsList(championships) {
        const list = document.getElementById('championshipsList');
        list.innerHTML = '';
        
        championships.forEach(championship => {
            const item = document.createElement('div');
            item.className = 'championship-item';
            
            const isSeasonChampion = championship.Position.includes('Overall') || championship.Position.includes('Season Champion');
            const points = championship.Best_Lap_or_Time.includes('pts') ? championship.Best_Lap_or_Time : '';
            
            item.innerHTML = `
                <div class="championship-title">
                    <i class="fas fa-crown" style="margin-right: 8px; color: #ffd700;"></i>
                    ${championship.Event}
                </div>
                <div class="championship-details">
                    <strong>Category:</strong> ${championship.Category} | 
                    <strong>Position:</strong> <span class="position-win">${championship.Position}</span>
                    <br>
                    <strong>Year:</strong> ${championship.Date.includes('2024') ? '2024' : '2025'}
                    ${points ? `<div class="championship-points"><strong>Points:</strong> ${points}</div>` : ''}
                    <div class="source-link"><strong>Source:</strong> ${championship.Source}</div>
                </div>
            `;
            list.appendChild(item);
        });
    }

    populatePodiumsTable(podiums) {
        const tableBody = document.getElementById('podiumsTableBody');
        tableBody.innerHTML = '';
        
        podiums.forEach(race => {
            const row = document.createElement('tr');
            const positionClass = race.Position.includes('2nd') ? 'position-second' : 'position-third';
            
            row.innerHTML = `
                <td>${this.formatDateForTable(race.Date)}</td>
                <td>${race.Event}</td>
                <td>${race.Category}</td>
                <td><span class="${positionClass}">${race.Position}</span></td>
                <td>${race.Best_Lap_or_Time || '-'}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    formatDateForTable(dateString) {
        if (dateString.includes('??')) {
            return 'Season 2024/2025';
        }
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString;
        }
        
        const day = date.getDate().toString().padStart(2, '0');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    loadDefaultChampionshipData() {
        // Fallback data if CSV parsing fails
        document.getElementById('totalWins').textContent = '6';
        document.getElementById('totalChampionships').textContent = '3';
        document.getElementById('totalPodiums').textContent = '2';
        
        document.getElementById('winsTableBody').innerHTML = `
            <tr><td colspan="5" style="text-align: center; padding: 20px; color: #a0aec0;">Championship data loading...</td></tr>
        `;
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new CyclingDashboard();
});

// Helper functions for manual data entry (available in console)
window.addSampleRider = async () => {
    const sampleRider = {
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
    };
    
    await window.dashboard.addRider(sampleRider);
};

window.addSampleRaceResult = async (riderId) => {
    if (!riderId) {
        console.log('Please provide a rider ID');
        return;
    }
    
    const sampleResults = [
        {
            rider_id: riderId,
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
            rider_id: riderId,
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
            rider_id: riderId,
            date: "2024-03-15",
            event: "Campeonato Catalunya",
            category: "Elite",
            position: "3rd",
            time: "2:58:44",
            is_winner: false,
            event_type: "Enduro",
            season: "2024"
        }
    ];
    
    for (const result of sampleResults) {
        await window.dashboard.addRaceResult(result);
    }
};