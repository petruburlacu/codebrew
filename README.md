# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Use Nx best practices to structure this angular project

Everything under /pages dir are routed lazy loaded sections of the application.

The /feature dir is responsible for holding out routed components for a particular page, activated by its corresponding route. These are supposed to be **smart** components, responsible for complex logic.
- It can hold one component like in the pages/home/feature
- It can hold multiple routes for a particular page like the pages/blog/feature
- A shell module is used for routing handling within a complex feature/

The /ui dir is responsible for holding dumb, presentational or reusable components
- it should use @Input / @Outputs to receive and communicate with the smart component parent
- it should not care about the state of the application
- Main focus is on displaying non complex ui

The /data-access dir holds everything relating to accessing/handling data: services, stores, etc.
- Smart components should pull the information from the data-access layer

The /utils dir holds any type of helper functions relevant to the page

Any elements used accross multiple pages, like ui elements, services, stores, etc should be placed under the /shared dir with similar nx folder structure.
*Note that /shared dir uses Single Component Angular Module (SCAM) approach instead of creating a general shared module. Every component, directive or pipe should be declared and exported in its own module.

### Routing
Pages that have multiple routes use shell feature to handle routing within that page's main route. All of the page specific routing information will be handled by a page-shell.
The main app-routing-module.ts will then point to that shell module that handles the rest.
This makes easier to separate logic based on feature.

Following this approach tends to encourage good architecutre structure:
- separating smart and dumb components
- translates easily to nx project
- good resource handling, utilizing lazy loading and separation between pages and features
- reduces bundle sizes
