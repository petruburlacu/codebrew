import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleBase: string = `Angular Universal - `;

  constructor(private title: Title, private meta: Meta) {}

  public setSEO(title: string, description: string, keywords: string[]): void {
    this.setTitle(title);
    this.setDescription(description);
    this.setKeywords(keywords);
    this.setViewport();
    this.setCharset();
    this.setRobots();
  }

  private setTitle(titlePart: string): void {
    this.title.setTitle(this.titleBase + titlePart);
  }

  private setDescription(description: string): void {
    this.meta.updateTag(
      { name: 'description', content: description },
      'name=description'
    );
  }

  private setKeywords(keywords: string[]): void {
    this.meta.updateTag(
      {
        name: 'keywords',
        content: keywords.reduce(
          (prev, curr) => (prev += `, ${curr}`)
        ),
      },
      'name=keywords'
    );
  }

  private setRobots(): void {
    this.meta.updateTag(
        { name: 'robots', content: 'index: follow, max-image-preview: large' },
        'name=robots'
    );
  }

  private setViewport(): void {
    this.meta.updateTag(
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    );
  }

  private setCharset(): void {
    this.meta.updateTag(
        { charset: 'UTF-8' }
    );
  }
}