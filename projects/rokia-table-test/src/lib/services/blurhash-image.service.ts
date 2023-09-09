import { Injectable } from '@angular/core';

// Utils
import { encode, decode } from 'blurhash';

@Injectable({
  providedIn: 'root'
})
export class BlurhashImageService {

  constructor() { }

  private async loadImage(src: any) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (...args) => reject(args);
      img.setAttribute('crossOrigin', '');
      img.src = src;
    });
  }

  private getImageData(image: any) {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context: any = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
  }

  async encode(url: string) {
    const image = await this.loadImage(url);
    const imageData = this.getImageData(image);
    return encode(imageData.data, imageData.width, imageData.height, 4, 4);
  }

  decode(encode: string, width: number, height: number) {
    return decode(encode, width, height);
  }
}
