import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/shared/data-access/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private title: string = 'Codebrew Angular Universal Tutorials';
  private description: string = 'Codebrew official website. Building meaningful web solutions for your needs.';
  private keywords: string[] = ['angular', 'universal', 'course', 'ssr', 'code'];

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setSEO(this.title, this.description, this.keywords);
  }

}
