export default async function fetchEvents({ keyword = '', dmaId = '505', date = '' } = {}) {
    const apiKey = 'BW7AXlRXKWgiAYSkY71zNBIAgFqUMuCn';
    const targetWidth = 600;
    let query = `?apikey=${apiKey}&countryCode=CA&locale=en-CA`;

    const compareEventsByDate = ((a, b) => {
        const year = a.date.year;
        const dateA = new Date(
            year,
            a.date.month - 1,
            a.date.day,
            ...a.date.time.split(":").map(Number)
        );
        const dateB = new Date(
            year,
            b.date.month - 1,
            b.date.day,
            ...b.date.time.split(":").map(Number)
        );
        return dateA - dateB;
    });

    if (keyword) query += `&keyword=${encodeURIComponent(keyword)}`;
    if (dmaId) query += `&dmaId=${encodeURIComponent(dmaId)}`;
    if (date) {
        const isoDate = new Date(date).toISOString();
        query += `&startDateTime=${encodeURIComponent(isoDate)}`;
    }
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json${query}`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();

        if (data._embedded?.events) {
            return data._embedded.events.map((e) => ({
                id: e.id,
                name: e.name,
                date: {
                    year: new Date(e.dates.start.dateTime).toLocaleString('default', { year: 'numeric' }),
                    month: new Date(e.dates.start.dateTime).toLocaleString('default', { month: 'numeric' }),
                    day: new Date(e.dates.start.dateTime).getDate(),
                    time: new Date(e.dates.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                },
                address: e._embedded.venues?.[0]?.name || 'Unknown venue',
                image: e.images?.reduce((prev, curr) =>
                    Math.abs(curr.width - targetWidth) < Math.abs(prev.width - targetWidth) ? curr : prev
                )?.url || null,
            })).sort(compareEventsByDate);
        }

        return [];
    } catch (err) {
        console.error('Error fetching events:', err);
        return [];
    }
}