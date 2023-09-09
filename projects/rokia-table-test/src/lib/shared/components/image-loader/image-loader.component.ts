import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

// Services
import { BlurhashImageService } from '../../../services/blurhash-image.service';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageLoaderComponent implements OnInit {
  @Input('url') url: string | undefined = undefined;
  @Input('id-item') id: string | undefined = undefined;
  @Input('blurCode') code: string = 'UII#S~56XToIysMwxFn%RUobozxbS#oJwJS#';
  @Input('index') index: any | undefined = undefined;
  @Input('width') width: number = 0;
  @Input('height') height: number = 0;

  constructor(
    private blurHash: BlurhashImageService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      const canvas: any = document.getElementById(`${this.id}-canv`);
      if (!canvas) return;
      this.width = canvas.width;
      this.height = canvas.height;
      this.createBlur();
    }, 0);
  }

  createBlur() {
    const pixels = this.blurHash.decode(this.code, this.width, this.height);
    const canvas: any = document.getElementById(`${this.id}-canv`);
    if (!canvas) return;
    const ctx: any = canvas.getContext('2d');
    const imageData = ctx.createImageData(this.width, this.height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  };

  catchLoad(canvas: any, image: any) {
    if (canvas) canvas.remove();
    if (image) image.style.opacity = 1;
  }

  catchError(event: any) {
    event.target.src = '../../../../../assets/images/Errors/error.webp';
  }
}
