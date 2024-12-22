# **CSE Forum Frontend**

Welcome to the **CSE Forum Frontend** repository! This project is built using **Next.js** and styled with **Tailwind CSS**.

This README will guide you through setting up the project locally, working on your branch, and running it in development mode.

---

## **Getting Started**

Follow these steps to set up and work on the project locally:

---

1. **Clone the Repository**

Open your terminal and run the following command to clone the repository:
`git clone https://github.com/your-username/cse-project-frontend.git`

2. **Navigate to the Project Directory:**

for exemple: `cd CSE-FORUMS-FRONTEND`
then open the folder in vs code (you can use this command on terminal: `code .`)

3. **Install Dependencies:**

Open terminal on vs code and execute : `npm install`

4. **Create a New Branch:**

`git branch your-github-name/page-name/section-name` (don't put section name if you're working on the whole page)

5. **Verify Branch Creation:**

`git branch`

# Ensure that the list contains:

```
* main
your-github-name/page-name/section-name
```

6. **Switch to Your Branch:**

   ```
   git checkout your-github-name/page-name/section-name
   ```

7. **Verify Branch Switch:**

   ```
   git branch
   ```

   # Ensure that the list contains:

   ```
   main
   *your-github-name/page-name/section-name
   ```

8. **Start and run in developement mode**

```
npm run dev
```

9. **Working with Tailwind CSS**

- Tailwind CSS is already set up. You can start using its utility classes directly in your components.
- For example, to create a button with some styling:
  ```html
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Click Me
  </button>
  ```
- The colors you need are already defined, use them directly, for exemple:
  ```html
  <p className="bg-primary-900">hey</p>
  ```
- There are 2 fonts, the default one is Oswald, to use the second one:
  ```html
  <p className="font-serif">hey</p>
  ```

10. **Committing Your Changes**

1. Add your changes to the staging area:
   ```bash
   git add .
   ```
1. Commit your changes with a descriptive message:
   `git commit -m "Add hero section for landing page"`

1. **Pushing Your Changes**
   Push your branch to the remote repository:
   `git push origin your-github-name/page-name/section-name`

1. **Create a Pull Request**
   Go to your GitHub repository, navigate to the `your-github-name/page-name/section-name`
   branch, and click on the "New pull request" button and request a merge.

