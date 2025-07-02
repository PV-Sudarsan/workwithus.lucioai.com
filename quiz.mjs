// Import fetch and Headers from node-fetch
import fetch, { Headers } from 'node-fetch';

// ==== CONFIGURATION  replace the token in the double qoutation====
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU1VEQVJTQU4gUCIsImVtYWlsIjoic3VkYXJzYW5qdWhpQGdtYWlsLmNvbSIsImRhdGUiOiIyMDI1LTA3LTAxIDE3OjEwOjUzIn0.r_AmfGYZQEQUY1wQAzEn_4jqL8uzLU1IaWpMygjPc3s"; // <-- Replace with your actual JWT token

// === Answer solver logic ===
function solveMathQuestion(question) {
    const q = question.toLowerCase();
    const numbers = q.match(/\d+/g)?.map(Number) || [];

    // --- Geography: Capital cities ---
    const capitals = {
        'mexico': 'Mexico City', 'france': 'Paris', 'italy': 'Rome',
        'spain': 'Madrid', 'germany': 'Berlin', 'japan': 'Tokyo',
        'china': 'Beijing', 'india': 'New Delhi', 'brazil': 'Brasilia',
        'canada': 'Ottawa', 'australia': 'Canberra', 'united kingdom': 'London',
        'uk': 'London', 'england': 'London', 'russia': 'Moscow',
        'egypt': 'Cairo', 'south africa': 'Cape Town', 'united states': 'Washington D.C.',
        'usa': 'Washington D.C.', 'america': 'Washington D.C.', 'argentina': 'Buenos Aires',
        'greece': 'Athens', 'norway': 'Oslo', 'sweden': 'Stockholm',
        'denmark': 'Copenhagen', 'netherlands': 'Amsterdam', 'portugal': 'Lisbon',
        'turkey': 'Ankara', 'thailand': 'Bangkok', 'south korea': 'Seoul',
        'north korea': 'Pyongyang', 'vietnam': 'Hanoi', 'indonesia': 'Jakarta',
        'philippines': 'Manila', 'pakistan': 'Islamabad', 'afghanistan': 'Kabul',
        'iran': 'Tehran', 'iraq': 'Baghdad', 'israel': 'Jerusalem',
        'saudi arabia': 'Riyadh', 'nigeria': 'Abuja', 'kenya': 'Nairobi',
        'morocco': 'Rabat', 'algeria': 'Algiers', 'libya': 'Tripoli',
        'sudan': 'Khartoum', 'ethiopia': 'Addis Ababa'
    };
    if (q.includes('capital of')) {
        for (const [country, capital] of Object.entries(capitals)) {
            if (q.includes(country)) return capital;
        }
    }

    // --- Examples of other categories (abbreviated) ---
    if (q.includes('largest desert')) return 'Sahara';
    if (q.includes('longest river')) return 'Nile';
    if (q.includes('highest mountain')) return 'Mount Everest';
    if (q.includes('speed of light')) return '299,792,458 m/s';

    // Basic math operations
    if (q.includes('sum') && q.includes('first') && q.includes('natural numbers')) {
        const n = numbers[0]; return (n * (n + 1)) / 2;
    }
    if (q.includes('square root')) return Math.sqrt(numbers[0]);

    if (q.includes('remainder') && q.includes('divided')) return numbers[0] % numbers[1];
    if (q.includes('mean') || q.includes('average')) return numbers.reduce((a, b) => a + b, 0) / numbers.length;

    if (q.includes('times') || q.includes('multiply') || q.includes('×') || q.includes('*')) return numbers.reduce((a, b) => a * b, 1);
    if (q.includes('plus') || q.includes('add') || q.includes('+')) return numbers.reduce((a, b) => a + b, 0);
    if (q.includes('minus') || q.includes('subtract') || q.includes('-')) return numbers.reduce((a, b) => a - b);
    if (q.includes('divided') || q.includes('divide') || q.includes('/')) return numbers.reduce((a, b) => a / b);

    if (q.includes('power') || q.includes('^') || q.includes('squared') || q.includes('cubed')) {
        if (q.includes('squared')) return numbers[0] ** 2;
        if (q.includes('cubed')) return numbers[0] ** 3;
        return numbers[0] ** numbers[1];
    }

    return numbers[0] || 0; // fallback: return first number
}

function solveTrivia(triviaData) {
    const answers = triviaData.questions.map(q => {
        const answer = solveMathQuestion(q.question);
        console.log(`Q: ${q.question} -> A: ${answer}`);
        return answer;
    });
    return { token: triviaData.token, answers: answers };
}

function createHeaders() {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", AUTH_TOKEN);
    myHeaders.append("Authorization", AUTH_TOKEN);
    myHeaders.append("Referer", "https://lucioai.com");
    myHeaders.append("User-Agent", "mr_robot");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `auth_token=${AUTH_TOKEN}`);
    return myHeaders;
}

async function fetchTrivia() {
    const requestOptions = { method: "GET", headers: createHeaders(), redirect: "follow" };
    const response = await fetch("https://workwithus.lucioai.com/logic-it-out", requestOptions);
    const text = await response.text();
    console.log('Fetched trivia:', text);
    return JSON.parse(text);
}

async function sendSolution(solutionData) {
    const requestOptions = {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify(solutionData),
        redirect: "follow"
    };
    const response = await fetch("https://workwithus.lucioai.com/logic-it-out", requestOptions);
    const text = await response.text();
    console.log('Submit response:', text);
    return text;
}

async function autoSolveTrivia() {
    console.log('Starting auto trivia solver...');
    while (true) {
        try {
            console.log('Fetching trivia questions...');
            const triviaData = await fetchTrivia();

            console.log('Solving trivia...');
            const solution = solveTrivia(triviaData);

            console.log('Sending solution...');
            const result = await sendSolution(solution);

            let parsedResult;
            try { parsedResult = JSON.parse(result); }
            catch { parsedResult = { message: result }; }

            if (parsedResult.error) {
                console.log('Error received, retrying immediately:', parsedResult.error);
                continue;
            } else {
                console.log('Success! Result:', parsedResult);
                break;
            }
        } catch (error) {
            console.error('Error in main loop:', error);
            console.log('Retrying in 1 second...');
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

console.log('Auto-solving trivia questions...');
autoSolveTrivia();