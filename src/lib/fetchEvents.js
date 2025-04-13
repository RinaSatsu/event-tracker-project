export default async function fetchEvents({ keyword = '', dmaId = '505', date = '' } = {}) {
    const apiKey = 'BW7AXlRXKWgiAYSkY71zNBIAgFqUMuCn';
    let query = `?apikey=${apiKey}&countryCode=CA&locale=en-CA`;
    
    if (keyword) query += `&keyword=${encodeURIComponent(keyword)}`;
    if (dmaId) query += `&dmaId=${encodeURIComponent(dmaId)}`;
    if (date) query += `&startDateTime=${encodeURIComponent(date)}`;
    
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json${query}`);
        const data = await response.json();
    
    if (data._embedded?.events) {
        return data._embedded.events.map((e) => ({
            id: e.id,
            name: e.name,
            date: {
                month: new Date(e.dates.start.dateTime).toLocaleString('default', { month: 'short' }),
                day: new Date(e.dates.start.dateTime).getDate(),
                time: new Date(e.dates.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
            address: e._embedded.venues?.[0]?.name || 'Unknown venue',
            link: e.name,
            image: e.images?.[0]?.url || null,
        }));
    }
    
    return [];
    } catch (err) {
    console.error('Error fetching events:', err);
    return [];
    }
    }