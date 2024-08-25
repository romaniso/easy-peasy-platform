<h1 align="center">
  <a href="http://www.easypeasy-lang.com"><img src="./client/src/assets/images/logo.png" alt="Easy-peasy lang logo" width="300"></a>
</h1>
<p align="center">
  <a href="https://github.com/romaniso/easy-peasy-platform/stargazers"><img src="https://img.shields.io/github/stars/romaniso/easy-peasy-platform.svg?style=social"></a>
  <a href="https://github.com/romaniso/easy-peasy-platform/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/romaniso/easy-peasy-platform.svg?style=social">
   </a>
   <img alt="Static Badge" src="https://img.shields.io/badge/version-beta-orange">
   <img alt="Static Badge" src="https://img.shields.io/badge/license-ECL-%20%23a5b4fc">
</p>

<p align="center">
   An English learning platform with interactive tasks, user's dashboard, and vocabulary storage. Covers grammar, vocabulary, listening, and reading. Offers educational articles on various English topics.
</p>

## Overview

This short gif presents the main features of the app:

![Quick overview of the project](https://i.ibb.co/5h5Vd0B/ezgif-3-9b8626aaa2.gif)

Additionally, if you would like to watch the complete overview video with voice description, you can
[go here](https://www.youtube.com/watch?v=KQTOrAbNrms&ab_channel=RomanIsopenko).

## Features

This app features:

- **Interactive exercises** of various types, including fill-box, flash-card, drag-and-drop, dropdown, multiple-choice, fill-in-letter, match-heading, and listen-and-type.
- Four main **learning modules**: grammar, vocabulary, reading, and listening.
- **An article section** with a preview page where users can filter articles based on language proficiency levels. Each article page fetches markdown files from the database and transforms them into a visually user-friendly format.
- **Authentication and authorization** functionalities, allowing both users and admins to log in. Security is enhanced using **JSON Web Tokens (JWT)**. Unauthorized users are redirected to appropriate pages. Additionally, the app includes a password reset feature using the **nodemailer** package, enabling users to receive an email with a validation token.
- **A dashboard page** where users can access statistical information about their performance on the app. Additionally, users can set personal goals to track their progress.
- **A profile page** where users can input personal information including their first and last name, email address, preferences, and motivation for learning English.
- **A settings page** where users can perform various actions such as changing their passwords, choosing the dark or light theme of the app, deleting their account, and switching between English, Polish, and Ukrainian languages
- **A glossary page** containing all the words and phrases added in the Reading section units. Users can edit, mark with a star, delete, revise, and filter entries in the glossary list.

## Used technologies

<div align="center" style="margin-bottom: 10px">
	<code><img width="30" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>
	<code><img width="30" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></code>
	<code><img width="30" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></code>
	<code><img width="30" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
	<code><img width="30" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>
	<code><img width="30" src="https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png" alt="Redux" title="Redux"/></code>
	<code><img width="30" src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest" title="Jest"/></code>
	<code><img width="30" src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png" alt="Vite" title="Vite"/></code>
	<code><img width="30" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/></code>
</div>

This project is based on MERN stack which includes:

- **Frontend**:
  - React.js
  - Tailwind.css
  - TypeScript
  - Redux-toolkit
- **Backend**:
  - Node.js
  - Express.js
  - Mongoose
- **Database**:
  - MongoDB
- **Testing**:
  - Jest
- **Deployment**:
  - Render.com
- **Patterns**:
  - MVC

<!--## Project Dependencies

### Client:

![Client Dependencies](https://i.ibb.co/NNbXrGY/client-dep.png)

![Client Dev Dependencies](https://i.ibb.co/Jsqt7Sw/client-devdep.png)

### Server:

![Client Dependencies](https://i.ibb.co/Jj7YbKM/server-dep.png)

![Client Dev Dependencies](https://i.ibb.co/BCcD9fg/server-devdep.png)-->

## Run Locally

**Clone the project with HTTPS**

```bash
  git clone https://github.com/romaniso/easy-peasy-platform.git
```

**Go to the client directory**

```bash
  cd client
```

**Install dependencies**

```bash
  npm install
```

**Start the server**

```bash
  npm run dev
```

**Go to the server directory (if you are in the client directory):**

```bash
  cd ../server
```

**Go to the server directory (if you are in the root directory):**

```bash
  cd server
```

**Install dependencies**

```bash
  npm install
```

Creating a .env file with necessary values typically involves setting up sensitive information such as database credentials, API keys, and other configurations. Below is an example of what your .env file might look like with placeholders for real values:

**.env**:

```bash
# MongoDB configuration
MONGODB_URI=your_mongodb_uri

# AWS configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_aws_bucket_name

# Other configurations
SECRET_KEY=your_secret_key
```

Replace your_mongodb_uri, your_aws_access_key_id, your_aws_secret_access_key, your_aws_region, your_aws_bucket_name, and your_secret_key with your actual values.

Ensure that your .env file is added to your .gitignore to prevent it from being pushed to your repository and exposed publicly.

As for creating MongoDB databases and AWS buckets, you would typically do this through their respective dashboards or command-line interfaces. Instructions for these processes vary depending on the platform and tools you're using. You may refer to the documentation provided by MongoDB and AWS for detailed instructions on how to create databases and buckets.

**Start the server**

```bash
  npm run dev
```

## Todo list

- [ ] Refactor the speech reader for flashcards.
- [ ] Add UI scroll animations.
- [ ] Add a "show right answers" button for the exercise page.
- [ ] Create common types and enums for client and server apps.
- [ ] Implement lazy loading for some components.
- [ ] Add a replacement test for new users.
- [ ] Refactor Backend App to Nest.js.
- [ ] Dockerize the app.

## Releases

### beta | 0.1.0

- Profile Page ✅
- Settings Page ✅
- Dashboard Page ✅
- Glossary Page ✅
- Exercise pages ✅
- Article pages ✅

## Upcoming releases announcements

### 1.0.0

- Admin Page
- Placement Test
- Simple exercise generator features
- Inbox
- Schedule
- Unit tests
- Podcast pages
- Dockerization

## Authors

- [@romaniso](https://www.github.com/romaniso)

## Acknowledgements

- [MegaK - May edition 2023](https://www.megak.pl/) for backend knowledge;
- [Dave Gray](https://github.com/gitdagray) for a great Authentication course;
- [Stephen Grider](https://www.udemy.com/course/react-redux/) for a great React course.

## License

**Educational Community License (ECL)**: It allows users to view and modify the code for educational purposes, but prohibits commercial use and requires any modifications to be shared under the same terms.
[For more information](https://en.wikipedia.org/wiki/Educational_Community_License).
