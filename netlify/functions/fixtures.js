exports.handler = async (event) => {
  const API_KEY = process.env.API_FOOTBALL_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "API key is missing. Check Netlify environment variables."
      })
    };
  }

  const date =
    event.queryStringParameters?.date ||
    new Date().toISOString().split("T")[0];

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid date format. Use YYYY-MM-DD." })
    };
  }

  const leagues = [39, 140, 78, 135, 2];

  try {
    const results = await Promise.all(
      leagues.map(async (league) => {
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?date=${date}&league=${league}&season=2026`,
          {
            headers: {
              "x-apisports-key": API_KEY
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Football API error: ${response.status}`);
        }

        const data = await response.json();
        return data.response || [];
      })
    );

    const fixtures = results.flat();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        date,
        total: fixtures.length,
        fixtures
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
