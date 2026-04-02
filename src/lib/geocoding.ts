export interface LocationData {
  name: string;
  lat: number;
  lon: number;
  timezone: string;
}

export async function geocodeLocation(query: string): Promise<LocationData[]> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`, {
      headers: {
        'Accept-Language': 'en',
      }
    });

    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.status}`);
    }

    const data = await response.json();
    const results = await Promise.all(
      data.map(async (item: { lat: string; lon: string; display_name: string }) => {
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);
        let timezone = 'UTC';
        try {
          const tzResp = await fetch(`https://api.wheretheiss.at/v1/coordinates/${lat},${lon}`);
          if (tzResp.ok) {
            const tzData = await tzResp.json();
            if (tzData.timezone_id) {
              timezone = tzData.timezone_id;
            }
          }
        } catch (e) {
          console.error("TZ fetch failed", e);
        }

        return {
          name: item.display_name,
          lat,
          lon,
          timezone
        };
      })
    );
    return results;
  } catch (error) {
    console.error('Geocoding failed:', error);
    return [];
  }
}
