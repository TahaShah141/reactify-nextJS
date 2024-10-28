Reactify Documentation
======================

Introduction
------------

**Reactify** is a robust web application designed to enhance the user experience in creating React projects. By providing a platform for user authentication, snippet sharing, and project management, Reactify enables developers to collaborate and build intricate user interfaces with ease.

### Key Features

-   **User Authentication**: Secure login via standard credentials or OAuth (Google/Github).
-   **Public Access**: The Snippets and About pages are accessible to all users, authenticated or not.
-   **Project Management**: Users can create and manage projects after logging in.

Authentication
--------------

Authentication is crucial for the security and privacy of users on any website. Reactify ensures that only registered users can access specific functionalities, like the editor and project management, while allowing public access to certain pages.

### Login Options

-   **Standard Login**: Users can log in using their credentials.
-   **OAuth Login**: Users can quickly log in using their Google or GitHub accounts, providing a seamless experience across devices.

Pages Overview
--------------

### Snippets Page

The Snippets page showcases community-created code snippets that serve as building blocks for developing complex UIs.

-   **Snippet Cards**: Each snippet card displays information such as:
    -   Last updated date
    -   Creator of the snippet
    -   Number of favorites
-   **Functionality**:
    -   **Copy Code Button**: Copies the code to the clipboard.
    -   **Open in Editor Button**: Allows logged-in users to start a new project using the selected snippet.

### Projects Page

The Projects page is the core of Reactify, facilitating project creation and management through three main components:

1.  **Sidebar**: Contains essential functionalities for the project creation process.
2.  **Workplace**: Displays tabs for each project, enabling real-time updates.
3.  **Component Tray**: Offers draggable components categorized for easy access.

#### Selected Menu

When a component is selected, the menu provides various options for editing, including:

-   CSS attributes
-   Inner text adjustments

### Project Sidebar

The sidebar enhances user navigation and project management:

-   **Current Project Display**: Shows the project currently open.
-   **User Projects**: Lists all projects created by the user.
-   **Snippets Tab**:
    -   Sections: All and Favorites.
    -   Options to copy or favorite snippets.
-   **Layers Tab**: Offers a structured view of the project's components.
-   **Icons Tab**: A collection of RadixUI icons for easy integration.
-   **Code Tab**: Provides a read-only view of the generated code.
-   **Save Menu**: Allows users to save snippets or projects for later use.

## Getting Started with Reactify

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (Node package manager, comes with Node.js)\
- **Git** (for version control) - [Download Git](https://git-scm.com/)

### Installation

Follow these steps to install Reactify on your local machine:

1\. **Clone the Repository**:

   Open your terminal and run the following command to clone the Reactify repository:

```bash
git clone https://github.com/yourusername/reactify.git
```

   Replace `yourusername` with your GitHub username or the appropriate repository path.

2\. **Navigate to the Project Directory**:

   Change your working directory to the cloned project folder:

```bash
cd reactify
```

3\. **Install Dependencies**:

   Run the following command to install all necessary dependencies:

```bash
npm install
```

4\. **Set Up Environment Variables**:

   If your project requires specific environment variables (like API keys), create a `.env` file in the root directory and add the required variables. Check your project's documentation or configuration for details.

5\. **Start the Development Server**:

   After the installation is complete, start the development server with the following command:

```bash
npm run dev
```

   This will start the React application, and you should see output indicating that the server is running. By default, it should be accessible at `http://localhost:3000`.

### Creating Your First Project

Once the application is running, follow these steps to create your initial project:

1\. **Log In**:

   Navigate to the login page and log in using your credentials or OAuth option (Google/Github).

2\. **Access the Projects Page**:

   After logging in, navigate to the Projects page from the main menu.

3\. **Create a New Project**:

   - Click on the **New Project** button.\
   - Enter a name and description for your project.\
   - Click **Create** to initialize your project.

4\. **Using Snippets**:

   - Go to the **Snippets** page to browse community-contributed snippets.\
   - Use the **Copy Code** button to copy any snippet you want to include in your project.\
   - Alternatively, click **Open in Editor** to start a new project with the snippet pre-loaded.

5\. **Build Your Project**:

   - Utilize the **Component Tray** to drag and drop components into your project workspace.\
   - Edit components using the **Selected Menu** on the right side.\
   - Add custom styles or classes as needed.

6\. **Save Your Project**:

   - Once you're satisfied with your project, use the **Save Menu** to save it for later access.\
   - You can also save snippets for public use by selecting the option to upload your component.

### Running the Project

To run your project and see it in action, follow these steps:

1\. **Install Project Dependencies** (if you haven't done this already):

```bash
npm install
```

2\. **Start the Development Server**:

```bash
npm run dev
```

3\. **Open Your Browser**:

   Open your web browser and navigate to `http://localhost:5173` to see your application in action.

### Further Development

As you develop your project, consider:

- **Utilizing Git**: Regularly commit your changes and push them to your remote repository.\
- **Testing**: Write tests for your components to ensure they behave as expected.\
- **Exploring Features**: Continuously explore new snippets and community contributions to enhance your project.


Usage Tips
----------

To enhance the user experience, here are some helpful tips:

-   **Copying Snippets**: You can directly copy code from the Snippets page without zipping/unzipping.
-   **Clipboard Functions**:
    -   Copy selected components with `Ctrl+C` and paste with `Ctrl+V`.
    -   Delete components using the `Delete` key.
-   **Reusable Components**: Create components in different tabs to avoid repetitive edits.
-   **Custom Classes**: Define temporary custom classes to apply multiple styles.
-   **Layer Navigation**: Use the Layers tab for easier component management.
-   **Reordering Components**: Hold `Ctrl` while releasing a dragged component to place it above another.
-   **Quick Text Edit**: Press `Ctrl+I` to edit the inner text of a selected component.
-   **Style Filtering**: Use the search bar in the style menu to quickly find desired styles.
