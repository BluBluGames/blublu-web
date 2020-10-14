import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'blublu-web'`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const homeComponent = fixture.componentInstance;
    expect(homeComponent.getData().name).toEqual('BluBlu Games');
    expect(homeComponent.getData().description).toEqual('BluBlu Games is a software house focused on creating games and websites');
    expect(homeComponent.getData().image).toEqual('../../../assets/img/blublu-logo-500-500.png');
    expect(homeComponent.getData().siteName).toEqual('BluBlu Games');
    expect(homeComponent.getData().type).toEqual('website');
  });

  it('should show header', () => {
    expect(fixture.nativeElement.querySelector('[data-test="header"]')).toBeTruthy();
  });

  it('should show logo', () => {
    expect(fixture.nativeElement.querySelector('[data-test="logo"]')).toBeTruthy();
  });

  it('should show menu', () => {
    expect(fixture.nativeElement.querySelector('[data-test="menu"]')).toBeTruthy();
  });

  it('should show content', () => {
    expect(fixture.nativeElement.querySelector('[data-test="content"]')).toBeTruthy();
  });

  it('should show content box', () => {
    expect(fixture.nativeElement.querySelector('[data-test="content-box"]')).toBeTruthy();
  });

  it('should show content box h2', () => {
    expect(fixture.nativeElement.querySelector('[data-test="content-box-h2"]')).toBeTruthy();
  });
  
  it('should have <h2> with correct innerHTML translate code', () => {
    const contentBoxParagraph: HTMLElement = fixture.nativeElement;
    const h2 = contentBoxParagraph.querySelector('[data-test="content-box-h2"]');
    expect(h2.textContent).toEqual('home.contentBox-h2');  
  });

  it('content-box-p', () => {
    expect(fixture.nativeElement.querySelector('[data-test="content-box-p"]')).toBeTruthy();
  });

  it('should have <p> with correct innerHTML', () => {
    const contentBoxParagraph: HTMLElement = fixture.nativeElement;
    const p = contentBoxParagraph.querySelector('[data-test="content-box-p"]');
    expect(p.textContent).toEqual('home.contentBox-p');  
  });

  it('content-box-about-button', () => {
    expect(fixture.nativeElement.querySelector('[data-test="content-box-about-button"]')).toBeTruthy();
  });

  it('should have correct innerHTML about button', () => {
    const link: HTMLElement = fixture.nativeElement;
    const about = link.querySelector('[data-test="content-box-about-button"]');
    expect(about.textContent).toEqual('home.contentBox-button');  
  });

  it('should correctly redirect on about button', () => {
    const link: HTMLElement = fixture.nativeElement;
    const hrefAbout = link.querySelector('[data-test="content-box-about-button"]').getAttribute('href');
    expect(hrefAbout).toEqual('/about');
  });

  it('should show social language menu', () => {
    expect(fixture.nativeElement.querySelector('[data-test="languages-menu"]')).toBeTruthy();
  });

  it('should language menu contain english and polish', () => {
    expect(fixture.nativeElement.querySelector('[data-test="language-select-english"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="language-select-polish"]')).toBeTruthy();
  });

  // TODO test for showing correct language by default - needs service mock
  // TODO test for change of language on selecting - needs service mocking

  it('should show social media menu', () => {
    expect(fixture.nativeElement.querySelector('[data-test="social-media-menu"]')).toBeTruthy();
  });

  it('should show all menu items', () => {
    expect(fixture.nativeElement.querySelector('[data-test="social-media-facebook-link"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="social-media-instagram-link"]')).toBeTruthy();
  });
  
  it('should show menu', () => {
    expect(fixture.nativeElement.querySelector('[data-test="menu"]')).toBeTruthy();
  });

  it('should show 5 links', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-test="menu-item"]').length).toBe(5);
  });

  it('should show all menu items', () => {
    expect(fixture.nativeElement.querySelector('[data-test="menu-item-home"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="menu-item-about"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="menu-item-games"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="menu-item-websites"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="menu-item-contact"]')).toBeTruthy();
  });

  it('should show all menu items with correct innerHTML', () => {
    const link: HTMLElement = fixture.nativeElement;
    const home = link.querySelector('[data-test="menu-item-home"]');
    expect(home.textContent).toEqual('menu.home');  
    const about = link.querySelector('[data-test="menu-item-about"]');
    expect(about.textContent).toEqual('menu.about');  
    const games = link.querySelector('[data-test="menu-item-games"]');
    expect(games.textContent).toEqual('menu.games');  
    const websites = link.querySelector('[data-test="menu-item-websites"]');
    expect(websites.textContent).toEqual('menu.websites');  
    const contact = link.querySelector('[data-test="menu-item-contact"]');
    expect(contact.textContent).toEqual('menu.contact');  
  });

  it('should routerLink redirect to correct path', () => {
    const link: HTMLElement = fixture.nativeElement;
    const hrefHome = link.querySelector('[data-test="menu-item-home"]').getAttribute('href');
    expect(hrefHome).toEqual('/');
    const hrefAbout = link.querySelector('[data-test="menu-item-about"]').getAttribute('href');
    expect(hrefAbout).toEqual('/about');
    const hrefGames = link.querySelector('[data-test="menu-item-games"]').getAttribute('href');
    expect(hrefGames).toEqual('/games');
    const hrefWebsites = link.querySelector('[data-test="menu-item-websites"]').getAttribute('href');
    expect(hrefWebsites).toEqual('/websites');
    const hrefContact = link.querySelector('[data-test="menu-item-contact"]').getAttribute('href');
    expect(hrefContact).toEqual('/contact');
  });
});
