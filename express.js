
const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

// Serve the combined Task & Weather UI
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family:sans-serif; max-width:400px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">
            <h2 id="w">Loading Weather...</h2>
            <hr>
            <h3>✅ Daily Tasks</h3>
            <ul id="t"></ul>
            <input id="i" placeholder="New task..." style="width:70%; padding:5px;">
            <button onclick="add()">Add</button>
            <script>
                // Fetch Weather (Simulated or Real API call)
                fetch('/weather?city=London').then(r => r.json()).then(d => {
                    document.getElementById('w').innerText = \`☁️ \${d.city}: \${d.temp}°C\`;
                });

                const add = () => {
                    const i = document.getElementById('i');
                    if(!i.value) return;
                    const li = document.createElement('li');
                    li.innerText = i.value;
                    document.getElementById('t').appendChild(li);
                    i.value = '';
                };
            </script>
        </div>
    `);
});

// Weather API Mock (Replace with real API key logic if desired)
app.get('/weather', (req, res) => {
    const city = req.query.city || 'Local';
    const mockTemp = Math.floor(Math.random() * 30); // Random temp for demo
    res.json({ city, temp: mockTemp });
});

app.listen(3000, () => console.log(\`Project live at http://localhost:\${PORT}\`));
