describe("Weather", function() {
    const testWeather = new Weather('ffe1a143b6990927809bed7b8012bcb2');

    // Example test: Process valid weather data
    it("should process valid weather data", function() {
        let data = { 
            cod: 200, 
            name: 'TestCity', 
            main: { temp: 25, humidity: 80 },
            weather: [{ main: 'Clear' }]
        };
        expect(testWeather.processWeatherData(data)).toEqual({
            city: 'TestCity',
            temperature: 25,
            description: 'Clear',
            humidity: 80
        });
    });

    // Additional tests here...
});
