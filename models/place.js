export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    // this.address = location.address;
    this.location = location; // {lat: 0.14231, lng: 127.121}
    // this.location = {lat: location.lat, lng: location.lng}; // {lat: 0.14231, lng: 127.121}
    // this.id = new Date().toString() + Math.random().toString();
    this.id = id
  }
}
