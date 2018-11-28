import { Component, HostListener, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'sprk-masthead',
  template: `
    <header
      class="sprk-c-Masthead sprk-o-Stack"
      role="banner"
      idString="masthead-1"
    >
      <div
        class="sprk-c-Masthead__content sprk-o-Stack__item sprk-o-Stack sprk-o-Stack--split@xxs"
      >
        <div
          class="sprk-c-Masthead__menu sprk-o-Stack__item o-Stack__item--center-column@xxs sprk-o-Box"
        >
          <button
            class="sprk-c-Menu"
            type="button"
            [attr.aria-expanded]="isNarrowNavOpen ? true : false"
            (click)="toggleNarrowNav($event)"
            data-sprk-mobile-nav-trigger="mobileNav"
          >
            <span class="sprk-u-ScreenReaderText">Toggle Navigation</span>
            <svg
              [ngClass]="{
                'sprk-c-Icon': true,
                'sprk-c-Icon--l': true,
                'sprk-c-Menu__icon': true,
                'sprk-c-Menu__icon--open': isNarrowNavOpen
              }"
              aria-hidden="true"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  class="sprk-c-Menu__line sprk-c-Menu__line--two"
                  d="m8 32h48"
                />
                <path
                  class="sprk-c-Menu__line sprk-c-Menu__line--one"
                  d="m8 18.68h48"
                />
                <path
                  class="sprk-c-Menu__line sprk-c-Menu__line--three"
                  d="m8 45.32h48"
                />
              </g>
            </svg>
          </button>
        </div>

        <div
          class="sprk-c-Masthead__logo sprk-o-Stack__item sprk-o-Stack__item--center-column@xxs sprk-o-Box"
        >
          <a [routerLink]="logoHref" href="#nogo">
            <ng-content select="[logo-slot]"></ng-content>
          </a>
        </div>

        <nav
          class="
          sprk-c-Masthead__little-nav
          sprk-o-Stack__item
          sprk-o-Stack__item--flex@xxs
          sprk-o-Stack
          sprk-o-Stack--large
          sprk-o-Stack--split@s
          sprk-o-Stack--end-row
          sprk-o-Box"
          role="navigation"
        >
          <div
            class="sprk-c-Masthead__site-links sprk-o-Stack__item sprk-o-Stack__item--center-column"
          >
            <ng-content select="[site-slot]"></ng-content>
          </div>

          <div class="sprk-o-Stack__item sprk-o-Stack__item--center-column">
            <ng-content select="[utility-slot]"></ng-content>
          </div>
        </nav>
      </div>

      <div class="sprk-o-Stack__item">
        <nav
          class="sprk-c-Masthead__big-nav"
          role="navigation"
          [attr.data-id]="idString"
        >
          <ul [ngClass]="getSecondaryNavClasses()">
            <li
              *ngFor="let link of secondaryNavLinks"
              [ngClass]="{
                'sprk-c-Masthead__big-nav-item': true,
                'sprk-c-Stack__item': true,
                'sprk-o-Stack__item--flex@xxs': true,
                'sprk-c-Masthead__big-nav-item--open':
                  link.focused && link.subNav
              }"
              routerLinkActive="sprk-c-Masthead__big-nav-item--active"
              [attr.aria-haspopup]="link.subNav ? 'true' : null"
              [attr.aria-expanded]="
                link.subNav && link.focused ? 'true' : 'false'
              "
              (focusin)="hideAllDropDowns($event); link.focused = true"
              (mouseenter)="hideAllDropDowns($event); link.focused = true"
              (mouseleave)="hideAllDropDowns($event)"
            >
              <div *ngIf="link.subNav">
                <sprk-dropdown
                  dropdownType="simple"
                  [choices]="link.subNav"
                  additionalTriggerClasses="sprk-b-Link--plain sprk-c-Masthead__link--big-nav"
                  additionalClasses="sprk-u-Width-100 sprk-u-TextAlign--left"
                  triggerIconType="chevron-down"
                  [triggerText]="link.text"
                ></sprk-dropdown>
              </div>
              <div *ngIf="!link.subNav">
                <a
                  class="sprk-b-Link sprk-b-Link--plain sprk-c-Masthead__link--big-nav"
                  [routerLink]="link.href"
                  href="#nogo"
                >
                  {{ link.text }}
                </a>
              </div>
            </li>
          </ul>
        </nav>

        <div
          *ngIf="isNarrowNavOpen"
          class="sprk-c-Masthead__narrow-nav"
          data-sprk-mobile-nav="mobileNav"
        >
          <nav role="navigation">
            <sprk-accordion
              additionalClasses="sprk-c-Accordion--navigation sprk-b-List sprk-b-List--bare"
            >
              <div *ngFor="let narrowLink of narrowNavLinks">
                <div *ngIf="narrowLink.subNav">
                  <sprk-accordion-item
                    iconTypeOpen="chevron-down"
                    iconTypeClosed="chevron-down"
                    [leadingIcon]="narrowLink.leadingIcon"
                    [isActive]="narrowLink.active"
                    [title]="narrowLink.text"
                  >
                    <li
                      class="sprk-c-Accordion__item"
                      *ngFor="let subNavLink of narrowLink.subNav"
                    >
                      <a
                        class="sprk-c-Accordion__summary"
                        [routerLink]="subNavLink.href"
                        href="#nogo"
                      >
                        <sprk-icon
                          [iconType]="subNavLink.leadingIcon"
                          additionalClasses="sprk-c-Icon--current-color sprk-c-Icon--l sprk-u-mrs"
                          *ngIf="subNavLink.leadingIcon"
                        ></sprk-icon>
                        {{ subNavLink.text }}
                      </a>
                    </li>
                  </sprk-accordion-item>
                </div>
                <div *ngIf="!narrowLink.subNav">
                  <li
                    [ngClass]="{
                      'sprk-c-Accordion__item': true,
                      'sprk-c-Accordion__item--active': narrowLink.active
                    }"
                  >
                    <a
                      class="sprk-c-Accordion__summary"
                      [routerLink]="narrowLink.href"
                      href="#nogo"
                    >
                      <sprk-icon
                        [iconType]="narrowLink.leadingIcon"
                        additionalClasses="sprk-c-Icon--current-color sprk-c-Icon--l sprk-u-mrs"
                        *ngIf="narrowLink.leadingIcon"
                      ></sprk-icon>
                      {{ narrowLink.text }}
                    </a>
                  </li>
                </div>
              </div>
            </sprk-accordion>
          </nav>
          <ng-content select="[narrowNavFooter]"></ng-content>
        </div>
      </div>
    </header>
  `
})
export class SparkMastheadComponent {
  @Input()
  logoHref = '/'; // Type inferred
  @Input()
  logoLinkScreenReaderText = 'Go to the homepage';
  @Input()
  additionalClasses: string;
  @Input()
  additionalSecondaryNavClasses: string;
  @Input()
  additionalNarrowNavClasses: string;
  @Input()
  narrowNavLinks: any[];
  @Input()
  isNarrowNavOpen = false;
  @Input()
  idString: string;
  @Input()
  secondaryNavLinks: any[];
  @Input()
  narrowNavOpen: boolean;

  iconType = 'chevron-down';
  componentID = _.uniqueId();
  controls_id = `sprk-narrow-navigation-item__${this.componentID}`;
  public iconStateClass = '';
  public animState = 'closed';

  @HostListener('window:resize')
  handleResizeEvent() {
    this.closeNarrowNav();
  }

  @HostListener('document:focusin', ['$event'])
  handleFocusEvent(event: FocusEvent) {
    this.hideAllDropDowns(event);
  }

  toggleAccordion(event): void {}

  accordionState(): void {}

  hideAllDropDowns(event): void {
    event.stopPropagation();
    this.secondaryNavLinks.forEach((link: object) => {
      if (link.hasOwnProperty('focused')) {
        link['focused'] = false;
      }
    });
  }

  getClasses(): string {
    const classArray: string[] = ['sprk-c-Masthead'];

    if (this.additionalClasses) {
      this.additionalClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    return classArray.join(' ');
  }

  getNarrowNavClasses(): string {
    const classArray: string[] = [
      'sprk-c-Accordion',
      'sprk-c-Accordion--navigation',
      'sprk-b-List',
      'sprk-b-List--bare'
    ];

    if (this.additionalNarrowNavClasses) {
      this.additionalNarrowNavClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    return classArray.join(' ');
  }

  getSecondaryNavClasses(): string {
    const classArray: string[] = [
      'sprk-c-Masthead__big-nav-items',
      'sprk-o-Stack',
      'sprk-o-Stack--split@xxs',
      'sprk-b-List',
      'sprk-b-List--bare'
    ];

    if (this.additionalSecondaryNavClasses) {
      this.additionalSecondaryNavClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    return classArray.join(' ');
  }

  toggleNarrowNav(event): void {
    event.preventDefault();
    this.isNarrowNavOpen = !this.isNarrowNavOpen;
  }

  closeNarrowNav(): void {
    this.isNarrowNavOpen = false;
  }
}
