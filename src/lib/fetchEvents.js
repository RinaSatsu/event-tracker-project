const filterDistinct = (events) => {
    const seen = new Set();
    return events.filter(event => {
      const name = event.name?.toLowerCase();
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    });
  };

export default async function fetchEvents({ keyword = '', dmaId = '500', date = '' } = {}) {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const targetWidth = 600;
    let query = `?apikey=${apiKey}&countryCode=CA&locale=en-CA&sort=date,name,asc&size=60`;

    if (keyword) query += `&keyword=${encodeURIComponent(keyword)}`;
    if (dmaId) query += `&dmaId=${encodeURIComponent(dmaId)}`;
    if (date) {
        const isoDate = new Date(`${date}T00:00:00Z`).toISOString().split('.')[0] + 'Z';
        query += `&startDateTime=${encodeURIComponent(isoDate)}`;
    }
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json${query}`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();

        if (data._embedded?.events) {
            const distinctEvents = filterDistinct(data._embedded?.events);
            return distinctEvents.map((e) => ({
                id: e.id,
                name: e.name,
                date: {
                    year: new Date(e.dates.start.dateTime || e.dates.start.localDate).toLocaleString('default', { year: 'numeric' }),
                    month: new Date(e.dates.start.dateTime || e.dates.start.localDate).toLocaleString('default', { month: 'numeric' }),
                    day: new Date(e.dates.start.dateTime || e.dates.start.localDate).getDate(),
                    time: (e.dates.start.dateTime ? new Date(e.dates.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : null),
                },
                address: e._embedded.venues?.[0]?.name || 'Unknown venue',
                image: e.images?.reduce((prev, curr) =>
                    Math.abs(curr.width - targetWidth) < Math.abs(prev.width - targetWidth) ? curr : prev
                )?.url || null,
            }));
        }

        return [];
    } catch (err) {
        console.error('Error fetching events:', err);
        return [];
    }
}