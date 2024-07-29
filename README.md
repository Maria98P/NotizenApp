
App
This project was generated with Angular CLI version 18.1.1.

Overview
This project is a web application featuring a frontend built with Angular, CSS, Bootstrap, and Font Awesome icons. The application interacts with a Symfony backend that uses Composer, MakerBundle, and DOMPurifier for managing and securing data.

Development Server
Run ng serve for a development server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

Backend Server
For the application to function correctly, you must also run the Symfony CRUD API project. Start the Symfony server by navigating to the Symfony project directory and running:

bash
Copy code
symfony serve
The Symfony server will run on http://localhost:8000/api by default, and it will handle CRUD operations for the notes.

Code Scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

Running Unit Tests
Run ng test to execute the unit tests via Karma.

Frontend
Technology Stack:
Angular: The frontend framework used for building the user interface.
CSS: Custom styles for layout and design.
Bootstrap: CSS framework for responsive design and styling.
Font Awesome: Icons used throughout the application for enhanced visual elements.
Backend
Symfony: PHP framework used for the backend API.
Composer: Dependency manager for PHP, used for managing Symfony components and libraries.
MakerBundle: Symfony bundle for generating code and scaffolding.
DOMPurifier: Library used to clean and secure user input.
MySQL: Database system used for storing notes and other data.
Functionality
The application provides functionalities for creating, reading, updating, and deleting (CRUD) notes. Users can:

Fetch: Retrieve and view existing notes.
Show: Display detailed information about a selected note.
Create: Add new notes to the database.
Update: Modify existing notes.
Delete: Remove notes from the database.
The frontend communicates with the Symfony backend to perform these operations and provides a user-friendly interface for managing notes.



Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
