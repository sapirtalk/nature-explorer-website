# Nature Explorer

Nature Explorer is a web application for exploring nature trails, wildlife, and plant life. It allows users to discover various trails, learn about local wildlife species, and explore plant life native to the area.

## Features

- Browse a catalog of nature trails with detailed information
- Learn about local wildlife species, including their habitats and conservation status
- Explore plant life native to the area, with descriptions and photos
- Create a user account to contribute observations, reviews, and photos
- Admin dashboard for managing trails, wildlife, and user accounts

## Technologies Used

- Next.js: React framework for building server-side rendered web applications
- Tailwind CSS: Utility-first CSS framework for styling components
- MongoDB: NoSQL database for storing trail, wildlife, and user data

## Getting Started

To get started working on Nature Explorer, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up environment variables. See `.env.example` for reference. (still not present)
4. Start the development server using `npm run dev`.

## Folder Structure

- `pages/`: Contains Next.js pages for routing and rendering UI components.
- `components/`: Reusable React components used throughout the application.
- `styles/`: CSS files, including Tailwind CSS and custom styles.
- `public/`: Static assets such as images, fonts, and other files.
- `api/`: Backend API routes for handling server-side logic (e.g., CRUD operations, authentication).

## Working together on the Project

To ensure a smooth process, please follow these steps when making changes:

### 1. Fork and Clone the Repository

1. **Fork the Repository**:
   - Go to the main repository on GitHub.
   - Click the "Fork" button in the top right corner to create your own copy of the repository.

2. **Clone Your Fork**:
   - Clone your forked repository to your local machine using the following command:
     ```sh
     git clone https://github.com/your-username/your-forked-repo.git
     ```

### 2. Create a Branch

Create a new branch for your changes:

```sh
git checkout -b feature-branch
```

### 3. Make Changes and Commit

1. **Make Your Changes**: Implement the changes or features you want to add.
2. **Stage Your Changes**: Add the changes to the staging area:
   ```sh
   git add .
   ```
3. **Commit Your Changes**: Commit your changes with a descriptive message:
   ```sh
   git commit -m "Description of changes"
   ```

### 4. Push the Changes to Your Forked Repository

Push the changes to the new branch in your forked repository:

```sh
git push origin feature-branch
```

### 5. Open a Pull Request

1. **Navigate to Your Forked Repository on GitHub**.
2. **Create a Pull Request**:
   - Click the "Compare & pull request" button next to the recently pushed branch.
   - Add a title and description for the pull request.
   - Click "Create pull request".

### 6. Review Process

I (or another reviewer) will review your pull request. During this process:

1. **Review Changes**: I will go through your changes and provide feedback or request changes if necessary.
2. **Make Adjustments**: If changes are requested, make the necessary updates and push them to the same branch. The pull request will automatically update.

### 7. Merge the Pull Request

Once the review is complete and the changes are approved, I will merge the pull request into the main branch. Optionally, I will delete the branch after merging.

### 8. Additional Notes

- **Branch Protection**: The main branch is protected, meaning all changes must go through a pull request and be reviewed before merging.


## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

