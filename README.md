Instructions to Set Up the Project

Clone the Repository: Open your terminal and run:

git clone <repository-url>
cd <repository-folder>

Install Node.js and npm: Ensure Node.js and npm are installed. You can download it from Node.js or check the versions with:

node -v
npm -v

Initialize the Project: If the node_modules folder or package.json is missing, you need to initialize the project:


npm init -y

Install Required Dependencies: Install the dependencies required for the project. Use the following commands:

npm install react react-dom
npm install @reduxjs/toolkit react-redux
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install date-fns
npm install react-beautiful-dnd

Replace the Default Folders:

Delete the default src and public folders created by the create-react-app.
Copy and paste the src and public folders from the repository into the project directory.
Start the Development Server: Run the application:



npm start


Troubleshooting:

If you encounter errors, make sure all dependencies are installed correctly.
Delete node_modules and package-lock.json and reinstall packages:

rm -rf node_modules package-lock.json
npm install
