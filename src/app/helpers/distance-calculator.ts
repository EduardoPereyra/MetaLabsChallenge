export class DistanceCalculator {

    static distanceInKmBetweenEarthCoordinates(lat1: number, lon1: number, lat2: number, lon2: number) {
        const earthRadiusKm = 6371;
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLon = this.degreesToRadians(lon2 - lon1);

        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (earthRadiusKm * c);
    }

    static degreesToRadians(degrees: number) {
        return degrees * Math.PI / 180;
    }
}
